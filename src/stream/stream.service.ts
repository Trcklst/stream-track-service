import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import configuration from '../config/configuration';
import { FILE_EXTENSION } from '../constants';

@Injectable()
export class StreamService {
  private fileModel: MongoGridFS;

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.fileModel = new MongoGridFS(this.connection.db, configuration.database.dbname);
  }

  async stream(trackId : string) {
     const track = await this.get(trackId);
     if(!track) {
       throw new NotFoundException('Track not found');
     }

     return await this.fileModel.readFileStream(track._id);
  }

  get(trackId : string) {
    return this.fileModel.findOne({filename: trackId + FILE_EXTENSION}).then(res => {
      return {
        _id: res._id,
        filename: res.filename,
        contentType: res.contentType,
      }
    }).catch(() => null);
  }
}
