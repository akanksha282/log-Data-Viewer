class Log {
    constructor(level, message, resourceId, timestamp, traceId, spanId, commit, metadata) {
      this.level = level;
      this.message = message;
      this.resourceId = resourceId;
      this.timestamp = timestamp;
      this.traceId = traceId;
      this.spanId = spanId;
      this.commit = commit;
      this.metadata = metadata || {};
    }
  }
  
  module.exports = Log;


