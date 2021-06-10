import ormconfig from './ormconfig';

const ormseedconfig = {
  ...ormconfig,
  migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: '/src/seeds',
  },
};

export default ormseedconfig;
