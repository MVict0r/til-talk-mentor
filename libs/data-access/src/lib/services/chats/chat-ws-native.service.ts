import { ChatConnectionWSParams, ChatWsService } from '../../interfaces/chats/chat-ws.service';

export class ChatWsNativeService implements ChatWsService{
  #socket: WebSocket | null = null

  connect(params: ChatConnectionWSParams){
    if (this.#socket) return

    this.#socket = new  WebSocket(params.url, [params.token])

    this.#socket.onmessage = (event: MessageEvent) => {
      params.handleMessage(JSON.parse(event.data))
    }

    this.#socket.onclose = () => {
      console.log('А чо вы это тут делаете? Кино - то давно уже кончилось!')
    }
  }

  sendMessage(text: string, chatId: number){
    this.#socket?.send(
      JSON.stringify({
        text,
        chatId: chatId
      })
    )
  }

  disconnect() {
    this.#socket?.close()
  }
}
