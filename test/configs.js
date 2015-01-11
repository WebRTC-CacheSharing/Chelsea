var devMemory = {
  environment: 'development',
  log: { level: 'info' },
  connections: {
    localMemoryDb: {
      adapter: 'sails-memory'
    }
  },
  models: {
    connection: 'localMemoryDb'
  }
};

var prodMemory = {
  environment: 'production',
  log: { level: 'info' },
  connections: {
    localMemoryDb: {
      adapter: 'sails-memory'
    }
  },
  models: {
    connection: 'localMemoryDb'
  }
};

var devMongo = {
  environment: 'development',
  log: { level: 'info' },
  connections: {
    localMongo: {
      adapter: 'sails-mongo'
    }
  },
  models: {
    connection: 'localMongo'
  }
};

var prodMongo = {
  environment: 'production',
  log: { level: 'info' },
  connections: {
    localMongo: {
      adapter: 'sails-mongo'
    }
  },
  models: {
    connection: 'localMongo'
  }
};

if (process.env.CI) {
  module.exports = [devMemory, prodMemory, devMongo, prodMongo];
}

else {
  module.exports = [devMemory, prodMemory];
}