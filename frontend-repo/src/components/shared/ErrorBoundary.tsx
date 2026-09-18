import React, { Component, ErrorInfo, ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { GradientButton } from "@/components/shared/GradientButton";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <Container className="max-w-md text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">
              An unexpected error occurred. We have been notified and are looking into it.
            </p>
            <GradientButton 
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Refresh Page
            </GradientButton>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}
