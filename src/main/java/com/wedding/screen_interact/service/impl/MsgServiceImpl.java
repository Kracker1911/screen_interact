package com.wedding.screen_interact.service.impl;

import com.wedding.screen_interact.dao.MsgDao;
import com.wedding.screen_interact.service.MsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author xuzhentao
 * @ClassName: MsgServiceImpl
 * @description: TODO
 * @date 2019/8/21 15:49
 */
@Service("msgService")
public class MsgServiceImpl implements MsgService {
    @Autowired
    private MsgDao msgDao;

    @Override
    public List<Map<String, String>> getMsg() {
        return msgDao.getMsg();
    }

    @Override
    public int deleteMsg(String msgId) {
        return msgDao.deleteMsg(msgId);
    }
}
