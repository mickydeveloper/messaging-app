import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class MessageService {
    private getMessagesUrl = 'api/messages/get';  // URL to web API
    private postMessagesUrl = 'api/messages/post';  // URL to web API
    constructor(private http: Http) { }
    private socket;
    private url = window.location.origin;

    /*
     * Get messages from server
     */
    getMessages(): Observable<Message[]> {
        let observable = new Observable(observer => {
            console.log("Socket:", this.url);
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getMessagesByRoomName(roomName): Observable<Message[]> {
        return this.http.get(this.getMessagesUrl, { params: { 'roomName': roomName}})
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Send message to server
     */
    addMessage(message: Message): Observable<Message> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postMessagesUrl, message, options)
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
