package com.wedding.screen_interact.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MsgDao {

    public List<Map<String,String>> getMsg();

    public int deleteMsg(String msgId);
}
