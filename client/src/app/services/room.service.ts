import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Room } from '../models/room';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class RoomService {
    private getRoomsUrl = 'api/rooms/get';  // URL to web API
    private postRoomsUrl = 'api/rooms/post';  // URL to web API
    constructor(private http: Http) { }
    private socket;
    private url = window.location.origin;

    /*
     * Get rooms from server
     */
    getRooms(): Observable<Room[]> {
        let observable = new Observable(observer => {
            console.log("Socket:", this.url);
            this.socket = io(this.url);
            this.socket.on('refreshRooms', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    /*
     * Send room to server
     */
    addRoom(room: Room): Observable<Room> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postRoomsUrl, room, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Data handlers
     */
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
