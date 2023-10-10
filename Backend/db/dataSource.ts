import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions  = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
<<<<<<< Updated upstream
    //password: 'anhtp524',
    password: '1',
=======
    password: 'anhtp524',
    //password: '17112001',
>>>>>>> Stashed changes
    database: 'hello_postgre',
    entities: ['dist/src/entity/*.entity{.ts,.js}'], 
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
}
//console.log(__dirname);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;