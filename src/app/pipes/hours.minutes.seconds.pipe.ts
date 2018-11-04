import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds'
})
@Injectable()
export class HoursMinutesSeconds {

  transform(value, args?) {

    const minutes = Math.floor(value / 60);
    const hours = Math.floor(minutes / 60);
    const seconds = Math.floor(value % 60);

    return hours + ' hrs, ' + minutes + ' mins, ' + seconds + ' secs';

  }

}
