package _1.logic.service;

import _1.logic.Entity.Message;
import _1.logic.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public void save(Message message){
        messageRepository.save(message);
    }

    public List<Message> findById(int id) {
        return  messageRepository.findById(id);
    }
}
