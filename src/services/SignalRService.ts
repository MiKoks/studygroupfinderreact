import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState, HttpTransportType } from '@microsoft/signalr';

const hubUrl = 'http://localhost:8000/myhub';

class SignalRService {
    private static instance: SignalRService;
    private connection: HubConnection;
    private isStarting: boolean = false; 

    private constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl(hubUrl, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .configureLogging(LogLevel.Information) 
            .build();
        
        this.connection.onreconnecting((error) => {
            console.log('SignalR is reconnecting due to error:', error);
        });

        this.connection.onreconnected((connectionId) => {
            console.log('SignalR has successfully reconnected. Connection ID:', connectionId);
        });
    }

    public static getInstance(): SignalRService {
        if (!SignalRService.instance) {
            SignalRService.instance = new SignalRService();
        }
        return SignalRService.instance;
    }

    public startConnection = async () => {
        if (this.connection.state === HubConnectionState.Disconnected && !this.isStarting) {
            this.isStarting = true; // Set flag when starting connection
            try {
                await this.connection.start();
                console.log('SignalR Connected');
            } catch (error) {
                console.error('Error connecting to SignalR:', error);
            } finally {
                this.isStarting = false; // Reset flag after attempting to start
            }
        }
    }

    public onReceiveMessage(callback: (message: string) => void): void {
        this.connection.on('ReceiveMessage', callback);
    }

    public sendMessage = async (message: string) => {
        if (this.connection.state === HubConnectionState.Connected) {
            try {
                await this.connection.invoke('SendMessageToAll', message);
                //console.log('Message sent:', message);
            } catch (error) {
                console.error('Error sending message via SignalR:', error);
            }
        } else {
            console.warn('Cannot send message. SignalR connection is not established.');
        }
    }

    public stopConnection = async () => {
        if (this.isStarting) {
            console.warn('Attempted to stop connection while starting. Operation skipped.');
            return; // Skip stopping if connection is in the process of starting
        }

        if (this.connection.state !== HubConnectionState.Disconnected) {
            try {
                await this.connection.stop();
                console.log('SignalR Disconnected');
            } catch (error) {
                console.error('Error disconnecting from SignalR:', error);
            }
        }
    }
}

export default SignalRService;
