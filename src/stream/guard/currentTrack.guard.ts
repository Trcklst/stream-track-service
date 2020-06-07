import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentTrackGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const trackId = request.params.trackId;
    return this.validateRequest(request, trackId);
  }

  validateRequest(request: Request, trackId){
    if(!request['party'].currentTrack || request['party'].currentTrack.id != trackId) {
      throw new UnauthorizedException('Unauthorized to play this track');
    }
    return true;
  }
}
