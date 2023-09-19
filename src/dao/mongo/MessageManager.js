import Message from '../models/messages.js'; 

class MessageManager {
  // Obtener todos los mensajes
  static async getAllMessages() {
    try {
      return await Message.find();
    } catch (error) {
      throw new Error(`Error al obtener los mensajes: ${error.message}`);
    }
  }

  // Agregar un nuevo mensaje
  static async addMessage(user, message) {
    try {
      const newMessage = new Message({ user, message });
      return await newMessage.save();
    } catch (error) {
      throw new Error(`Error al agregar el mensaje: ${error.message}`);
    }
  }
}

export default MessageManager;