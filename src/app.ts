import express, { Express } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
import swaggerDocs from '@/swagger/swagger';

class App {
  public express: Express;
  public port: number;
  public server: any;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(
      morgan('dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test',
      })
    );
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  public listen(): void {
    this.server = this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
      swaggerDocs(this.express, this.port);
    });
  }
}

export default App;
