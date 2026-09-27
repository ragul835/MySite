#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
RUN_DIR="$PROJECT_DIR/.run"
PID_FILE="$RUN_DIR/server.pid"
LOG_FILE="$RUN_DIR/server.log"
ENV_FILE="$PROJECT_DIR/.env"

cd "$PROJECT_DIR"

info() { printf '[manage] %s\n' "$*"; }
error() { printf '[manage] ERROR: %s\n' "$*" >&2; }

http_ok() {
  local url="$1"
  if command -v curl >/dev/null 2>&1; then
    curl --silent --fail --max-time 2 "$url" >/dev/null
  else
    node --input-type=module -e 'try { const r = await fetch(process.argv[1], { signal: AbortSignal.timeout(2000) }); process.exit(r.ok ? 0 : 1); } catch { process.exit(1); }' "$url"
  fi
}

usage() {
  cat <<'EOF'
Usage: ./manage.sh [command]

Commands:
  start      Build the production site and start the combined site/API server
  start-all  Alias for start (the production site and API run together)
  build      Typecheck and build the production site/API
  install    Install locked workspace dependencies
  stop       Stop the server started by this script
  restart    Stop, rebuild, and start
  status     Show process and HTTP health status
  logs       Follow the server log (Ctrl+C to return)
  help       Show this help

With no command, opens the interactive management menu.
EOF
}

require_runtime() {
  command -v node >/dev/null 2>&1 || {
    error "Node.js 24 or newer is required."
    return 1
  }
  local node_major
  node_major="$(node -p 'Number(process.versions.node.split(".")[0])')"
  if (( node_major < 24 )); then
    error "Node.js 24 or newer is required; found $(node --version)."
    return 1
  fi
}

read_port() {
  local port="5001"
  if [[ -f "$ENV_FILE" ]]; then
    local configured
    configured="$(sed -nE 's/^PORT=([0-9]+)[[:space:]]*$/\1/p' "$ENV_FILE" | tail -n 1)"
    [[ -z "$configured" ]] || port="$configured"
  fi
  printf '%s' "$port"
}

server_pid() {
  [[ -f "$PID_FILE" ]] || return 1
  local pid
  pid="$(<"$PID_FILE")"
  [[ "$pid" =~ ^[0-9]+$ ]] || return 1
  kill -0 "$pid" 2>/dev/null || return 1
  local command_line
  command_line="$(ps -p "$pid" -o args= 2>/dev/null)" || return 1
  [[ "$command_line" == *"artifacts/api-server/dist/index.mjs"* ]] || return 1
  printf '%s' "$pid"
}

build() {
  require_runtime || return
  command -v pnpm >/dev/null 2>&1 || {
    error "pnpm is required. Enable Corepack and install the version listed in package.json/README.md."
    return 1
  }
  info "Building the production site and API..."
  pnpm run build
}

install() {
  command -v corepack >/dev/null 2>&1 || {
    error "Corepack is required to install the pinned pnpm version."
    return 1
  }
  corepack enable
  corepack pnpm install --frozen-lockfile
}

start() {
  require_runtime || return
  [[ -f "$ENV_FILE" ]] || {
    error "Missing .env. Copy .env.example to .env and set DATABASE_URL to your PostgreSQL database."
    return 1
  }

  if pid="$(server_pid)"; then
    info "Already running (PID $pid) at http://localhost:$(read_port)"
    return 0
  fi

  build || return
  mkdir -p "$RUN_DIR"
  rm -f "$PID_FILE"
  info "Starting the combined website and API..."
  nohup node --env-file=.env --enable-source-maps artifacts/api-server/dist/index.mjs \
    >>"$LOG_FILE" 2>&1 < /dev/null &
  local pid=$!
  printf '%s\n' "$pid" > "$PID_FILE"

  local url="http://127.0.0.1:$(read_port)/api/healthz"
  for _ in {1..30}; do
    if ! kill -0 "$pid" 2>/dev/null; then
      rm -f "$PID_FILE"
      error "Server exited during startup. Check logs with ./manage.sh logs"
      return 1
    fi
    if http_ok "$url"; then
      info "Running at http://localhost:$(read_port) (PID $pid)"
      info "Health: $url"
      info "Logs: $LOG_FILE"
      return 0
    fi
    sleep 1
  done

  error "Server did not become healthy within 30 seconds. Check ./manage.sh logs"
  if kill -0 "$pid" 2>/dev/null; then
    kill -TERM "$pid" 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
  return 1
}

stop() {
  local pid
  if ! pid="$(server_pid)"; then
    rm -f "$PID_FILE"
    info "Server is not running."
    return 0
  fi

  info "Stopping server (PID $pid)..."
  kill -TERM "$pid"
  for _ in {1..10}; do
    kill -0 "$pid" 2>/dev/null || break
    sleep 1
  done
  if kill -0 "$pid" 2>/dev/null; then
    error "Server did not stop after SIGTERM; leaving it running for safety."
    return 1
  fi
  rm -f "$PID_FILE"
  info "Stopped."
}

status() {
  local port pid
  port="$(read_port)"
  if pid="$(server_pid)"; then
    info "Process running (PID $pid)."
  else
    info "Process stopped."
  fi
  if http_ok "http://127.0.0.1:$port/api/healthz"; then
    info "HTTP health check passed at http://localhost:$port/api/healthz"
  else
    info "HTTP health check unavailable at http://localhost:$port/api/healthz"
  fi
}

interactive_menu() {
  while true; do
    printf '\nWe Raise Tech project manager\n'
    printf '  1) Install dependencies\n'
    printf '  2) Build production app\n'
    printf '  3) Start production app\n'
    printf '  4) Restart production app\n'
    printf '  5) Stop production app\n'
    printf '  6) Show status\n'
    printf '  7) View logs\n'
    printf '  0) Exit\n'
    read -r -p 'Choose an action: ' choice || return 0
    case "$choice" in
      1) install ;;
      2) build ;;
      3) start ;;
      4) stop; start ;;
      5) stop ;;
      6) status ;;
      7)
        if [[ -f "$LOG_FILE" ]]; then tail -n 80 -f "$LOG_FILE"; else error "No server log yet. Start the project first."; fi
        ;;
      0) return 0 ;;
      *) error "Choose one of the listed options." ;;
    esac
  done
}

case "${1:-menu}" in
  start) start ;;
  start-all) start ;;
  build) build ;;
  install) install ;;
  stop) stop ;;
  restart) stop; start ;;
  status) status ;;
  logs)
    [[ -f "$LOG_FILE" ]] || { error "No server log yet. Start the project first."; exit 1; }
    tail -f "$LOG_FILE"
    ;;
  help|--help|-h) usage ;;
  menu) interactive_menu ;;
  *) usage >&2; exit 2 ;;
esac
