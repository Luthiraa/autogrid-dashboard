type Callback = () => void;

class HourlyTimer {
  private callbacks: Set<Callback> = new Set();
  private interval: NodeJS.Timeout | null = null;
  private timeout: NodeJS.Timeout | null = null;

  public subscribe(callback: Callback): () => void {
    this.callbacks.add(callback);
    
    // If this is the first subscriber, start the timer
    if (this.callbacks.size === 1) {
      this.startTimer();
    }
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
      if (this.callbacks.size === 0) {
        this.cleanup();
      }
    };
  }

  private startTimer() {
    const executeCallbacks = () => {
      this.callbacks.forEach(callback => callback());
    };

    // Calculate milliseconds until next hour
    const now = new Date();
    const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();

    // Initial alignment to next hour
    this.timeout = setTimeout(() => {
      executeCallbacks();
      // After initial alignment, set up the hourly interval
      this.interval = setInterval(executeCallbacks, 60 * 60 * 1000);
    }, msUntilNextHour);
  }

  private cleanup() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}

// Export singleton instance
export const hourlyTimer = new HourlyTimer();