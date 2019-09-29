package com.wedding.screen_interact.controller;

import com.wedding.screen_interact.service.MsgService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MainController {

    private static final Logger log = LoggerFactory.getLogger(MainController.class);
    @Autowired
    MsgService msgService;

    @RequestMapping(value="/index",method= RequestMethod.GET)
    public String login(){
        return "index";
    }

    @RequestMapping(value="/loadMsgs",method= RequestMethod.GET)
    @ResponseBody
    public List loadMsgs(){
        List resultList = msgService.getMsg();
        return resultList;
    }

    @RequestMapping(value="/delMsg",method= RequestMethod.GET)
    @ResponseBody
    public int delMsg(String msgId){
        return msgService.deleteMsg(msgId);
    }


}
