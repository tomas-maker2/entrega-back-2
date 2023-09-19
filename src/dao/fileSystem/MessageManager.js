import fs from 'fs';

class MessageManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.messages = [];
    this.loadMessages();
  }

  loadMessages() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.messages = JSON.parse(data);
    } catch (error) {
      this.messages = [];
    }
  }

  saveMessages() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.messages, null, 2), 'utf-8');
  }

  // Obtener todos los mensajes
  getMessages() {
    return this.messages;
  }

  // Agregar un nuevo mensaje
  addMessage(user, message) {
    const newMessage = {
      user,
      message,
      timestamp: new Date().toISOString()
    };
    this.messages.push(newMessage);
    this.saveMessages();
    return newMessage;
  }

}

export default MessageManager;