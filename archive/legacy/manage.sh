#!/bin/bash

# ==========================================
# Advanced Project Management Script
# ==========================================

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend-repo"
FRONTEND_DIR="$PROJECT_DIR/frontend-repo"
PID_FILE="$BACKEND_DIR/.backend.pid"
FRONTEND_PID_FILE="$FRONTEND_DIR/.frontend.pid"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Load environment variables if .env exists
if [ -f "$PROJECT_DIR/.env" ]; then
    export $(grep -v '^#' "$PROJECT_DIR/.env" | xargs)
fi

# Ports
BACKEND_PORT=${BACKEND_PORT:-5001}
FRONTEND_PORT=${PORT:-3000}

function echo_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
function echo_error() { echo -e "${RED}[ERROR]${NC} $1"; }
function echo_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
function echo_step() { echo -e "${CYAN}==>${NC} ${BLUE}$1${NC}"; }

function check_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
            return 0 # Port is in use
        fi
    elif command -v netstat &> /dev/null; then
        if netstat -tuln | grep -q ":$port " ; then
            return 0
        fi
    fi
    return 1 # Port is free
}

function free_port() {
    local port=$1
    if check_port $port; then
        echo_warn "Port $port is in use. Attempting to free it..."
        if command -v lsof &> /dev/null; then
            local pid=$(lsof -Pi :$port -sTCP:LISTEN -t)
            if [ ! -z "$pid" ]; then
                kill -9 $pid 2>/dev/null || sudo kill -9 $pid 2>/dev/null
                echo_info "Killed process $pid on port $port."
            fi
        elif command -v fuser &> /dev/null; then
            fuser -k -n tcp $port 2>/dev/null || sudo fuser -k -n tcp $port 2>/dev/null
            echo_info "Killed process on port $port using fuser."
        fi
        sleep 1
    fi
}

function install_dependencies() {
    echo_step "Checking System Dependencies"
    
    if ! command -v npm &> /dev/null; then
        echo_warn "npm not found. Installing..."
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y npm
        else
            echo_error "Install Node.js manually."
        fi
    fi

    echo_step "Installing Backend Dependencies"
    cd "$BACKEND_DIR" || exit 1
    npm install

    echo_step "Installing Frontend Dependencies"
    cd "$FRONTEND_DIR" || exit 1
    npm install
}

function build() {
    install_dependencies
    
    echo_step "Typechecking Frontend"
    cd "$FRONTEND_DIR" || exit 1
    if ! npm run typecheck; then
        echo_warn "Frontend typecheck warnings found (continuing build...)"
    fi

    echo_step "Building Frontend"
    if ! npm run build; then
        echo_error "Frontend build failed."
        exit 1
    fi

    echo_step "Building Backend"
    cd "$BACKEND_DIR" || exit 1
    npx prisma generate
    if npm run build; then
        echo_info "Backend build successful."
    else
        echo_error "Backend build failed."
        exit 1
    fi
}

function start_backend() {
    echo_step "Starting Backend"
    
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo_warn "Backend is already running (PID: $(cat "$PID_FILE"))."
        return
    fi
    
    if check_port $BACKEND_PORT; then
        echo_error "Port $BACKEND_PORT is already in use by another process."
        echo_error "Please run './manage.sh stop' or free the port first."
        exit 1
    fi

    cd "$BACKEND_DIR" || exit 1
    
    if [ ! -f "dist/index.js" ]; then
        echo_error "No dist/index.js found. Please run './manage.sh build' first."
        exit 1
    fi

    PORT=$BACKEND_PORT nohup node dist/index.js > backend.log 2>&1 &
    local PID=$!
    echo $PID > "$PID_FILE"
    echo_info "Backend started on port $BACKEND_PORT (PID: $PID)."
    echo_info "Logs: backend-repo/backend.log"
}

function start_frontend() {
    echo_step "Starting Frontend"
    
    if [ -f "$FRONTEND_PID_FILE" ] && kill -0 $(cat "$FRONTEND_PID_FILE") 2>/dev/null; then
        echo_warn "Frontend is already running (PID: $(cat "$FRONTEND_PID_FILE"))."
        return
    fi
    
    if check_port $FRONTEND_PORT; then
        echo_error "Port $FRONTEND_PORT is already in use."
        echo_error "Please run './manage.sh stop' or free the port first."
        exit 1
    fi

    cd "$FRONTEND_DIR" || exit 1
    export PORT=$FRONTEND_PORT
    export BASE_PATH=${BASE_PATH:-"/"}
    
    nohup npm run dev > frontend.log 2>&1 &
    local PID=$!
    echo $PID > "$FRONTEND_PID_FILE"
    echo_info "Frontend started on port $FRONTEND_PORT (PID: $PID)."
    echo_info "Logs: frontend-repo/frontend.log"
}

function start_all() {
    start_backend
    sleep 2
    start_frontend
    echo_step "All services started successfully!"
}

function stop_backend() {
    echo_step "Stopping Backend"
    if [ -f "$PID_FILE" ]; then
        local PID=$(cat "$PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            echo_info "Stopping backend (PID: $PID)..."
            kill $PID 2>/dev/null
            sleep 1
            kill -9 $PID 2>/dev/null || true
            echo_info "Backend stopped."
        fi
        rm -f "$PID_FILE"
    else
        local PID=$(pgrep -f "node dist/index.js")
        if [ ! -z "$PID" ]; then
            echo_info "Found backend process without PID file. Stopping..."
            kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null
        fi
    fi
    free_port $BACKEND_PORT
}

function stop_frontend() {
    echo_step "Stopping Frontend"
    if [ -f "$FRONTEND_PID_FILE" ]; then
        local PID=$(cat "$FRONTEND_PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            echo_info "Stopping frontend (PID: $PID)..."
            pkill -P $PID 2>/dev/null || true
            kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null
            echo_info "Frontend stopped."
        fi
        rm -f "$FRONTEND_PID_FILE"
    else
         local PID=$(pgrep -f "vite --config vite.config.ts")
         if [ ! -z "$PID" ]; then
             echo_info "Found frontend vite process without PID file. Stopping..."
             kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null
         fi
    fi
    free_port $FRONTEND_PORT
}

function stop() {
    stop_backend
    stop_frontend
}

function restart() { stop; sleep 2; start_all; }

function status() {
    echo_step "Service Status"
    
    # Backend
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo_info "Backend:  RUNNING (PID: $(cat "$PID_FILE"), Port: $BACKEND_PORT)"
    elif pgrep -f "node dist/index.js" >/dev/null; then
        echo_warn "Backend:  RUNNING (PID file missing)"
    else
        echo_info "Backend:  STOPPED"
    fi

    # Frontend
    if [ -f "$FRONTEND_PID_FILE" ] && kill -0 $(cat "$FRONTEND_PID_FILE") 2>/dev/null; then
        echo_info "Frontend: RUNNING (PID: $(cat "$FRONTEND_PID_FILE"), Port: $FRONTEND_PORT)"
    elif pgrep -f "vite.*--host" >/dev/null; then
        echo_warn "Frontend: RUNNING (PID file missing)"
    else
        echo_info "Frontend: STOPPED"
    fi
}

function clean() {
    echo_step "Cleaning Project Files"
    echo_info "Removing node_modules, target directories, and logs..."
    rm -rf "$BACKEND_DIR/node_modules" "$BACKEND_DIR/dist"
    rm -rf "$FRONTEND_DIR/node_modules" "$FRONTEND_DIR/dist"
    rm -f "$FRONTEND_DIR/frontend.log" "$BACKEND_DIR/backend.log"
    rm -f "$PID_FILE" "$FRONTEND_PID_FILE"
    echo_info "Clean complete."
}

function show_logs() {
    echo_step "Tailing Logs (Press Ctrl+C to stop)"
    
    local log_files=()
    [ -f "$BACKEND_DIR/backend.log" ] && log_files+=("$BACKEND_DIR/backend.log")
    [ -f "$FRONTEND_DIR/frontend.log" ] && log_files+=("$FRONTEND_DIR/frontend.log")
    
    if [ ${#log_files[@]} -eq 0 ]; then
        echo_error "No log files found."
        return
    fi
    
    tail -f "${log_files[@]}"
}

function pull() {
    echo_step "Git Pull"
    cd "$PROJECT_DIR" || exit 1
    local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    if [ -n "$branch" ]; then
        git pull origin "$branch" && echo_info "Pulled from $branch" || echo_error "Pull failed"
    else
        echo_error "Not a git repo."
    fi
}

function push() {
    echo_step "Git Push"
    cd "$PROJECT_DIR" || exit 1
    read -p "Commit message (default 'Update'): " msg
    msg=${msg:-"Update"}
    git add .
    git commit -m "$msg"
    local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    if [ -n "$branch" ]; then
        git push origin "$branch" && echo_info "Pushed to $branch" || echo_error "Push failed"
    else
        echo_error "Not a git repo or no commits."
    fi
}

function show_help() {
    echo -e "${YELLOW}Usage: ./manage.sh [command]${NC}"
    echo ""
    echo "Commands:"
    echo "  build          - Install deps and build both frontend & backend"
    echo "  start          - Start the backend only"
    echo "  start-frontend - Start the frontend only"
    echo "  start-all      - Start backend and frontend"
    echo "  stop           - Stop all running services (frontend, backend)"
    echo "  stop-backend   - Stop the backend only"
    echo "  stop-frontend  - Stop the frontend only"
    echo "  restart        - Stop and restart all services"
    echo "  status         - Show status of services"
    echo "  clean          - Remove build artifacts, node_modules, and logs"
    echo "  logs           - Tail frontend and backend logs simultaneously"
    echo "  pull           - Quick git pull"
    echo "  push           - Quick git add, commit, and push"
    echo "  help           - Show this help message"
}

function interactive_menu() {
    while true; do
        echo -e "\n${YELLOW}=== Advanced Management Menu ===${NC}"
        echo "1) Build everything"
        echo "2) Start Backend only"
        echo "3) Start Frontend only"
        echo "4) Start ALL services"
        echo "5) Stop Backend only"
        echo "6) Stop Frontend only"
        echo "7) Stop ALL services"
        echo "8) Restart ALL services"
        echo "9) Show Status"
        echo "10) View combined Logs"
        echo "11) Clean project (Danger)"
        echo "12) Pull from Git"
        echo "13) Push to Git"
        echo "0) Exit"
        read -p "Select an option [0-13]: " OPTION
        echo ""
        
        case $OPTION in
            1) build ;;
            2) start_backend ;;
            3) start_frontend ;;
            4) start_all ;;
            5) stop_backend ;;
            6) stop_frontend ;;
            7) stop ;;
            8) restart ;;
            9) status ;;
            10) show_logs ;;
            11) clean ;;
            12) pull ;;
            13) push ;;
            0) echo_info "Exiting..."; break ;;
            *) echo_error "Invalid option." ;;
        esac
    done
}

if [ $# -eq 0 ]; then
    interactive_menu
else
    case "$1" in
        build) build ;;
        start) start_backend ;;
        start-frontend) start_frontend ;;
        start-all) start_all ;;
        stop) stop ;;
        stop-backend) stop_backend ;;
        stop-frontend) stop_frontend ;;
        restart) restart ;;
        status) status ;;
        clean) clean ;;
        logs) show_logs ;;
        pull) pull ;;
        push) push ;;
        help|--help|-h) show_help ;;
        *) show_help; exit 1 ;;
    esac
fi
