import { ApplicationConfig } from '@loopback/core';
import { RestApplication, RestServer, RestBindings } from '@loopback/rest';
import { MySequence } from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot';
import { RepositoryMixin, Class, Repository, juggler } from '@loopback/repository';
/* tslint:enable:no-unused-variable */



export class TigersMilkApiApplication extends BootMixin(RepositoryMixin(RestApplication)) {
  constructor(options?: ApplicationConfig) {
    //super(options);
    super ({
      rest: {
        port : process.env.PORT || 3000
      }
    }); 

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // var enviornment = process.env.NODE_ENV;
    // var databaseName = 'tigers-milk';
    // // = null
    // var databaseUsername = 'root';
    // var databasePassword = 'chiko2012';

    // if (enviornment == "sydney"){
    //   databaseName = 'tigers-milk';
    //   // = process.env.DATABASE_NAME as string;
    // }


    // var dataSourceConfig = new juggler.DataSource({
    //   name: "db",
    //   connector: 'loopback-connector-mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   database: databaseName,
    //   user: databaseUsername,
    //   password: databasePassword
    // });
    // this.dataSource(dataSourceConfig);

    // var dataSourceConfig = new juggler.DataSource({
    //   name: "db",
    //   connector: 'memory'
    // });


    // var dataSourceConfig = new juggler.DataSource({
    //   name: "db",
    //   connector: 'loopback-connector-mysql',
    //   host: 'ix-fs-1.ce5d5ftkvwyr.eu-west-1.rds.amazonaws.com',
    //   port: 3306,
    //   database: 'tigers-milk-api',
    //   user: 'ix_fs_1',
    //   password: 'ixperience2018'
    // });

    var dataSourceConfig = new juggler.DataSource({
      name: "db",
      connector: 'loopback-connector-mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    });
  

      // user: 'root',
      // password: 'chiko2012'
 
    this.dataSource(dataSourceConfig);

    // this.bind("auth.service").toClass(AuthService);
  
  }


  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get(RestBindings.PORT);
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/ping`);
  }
}
