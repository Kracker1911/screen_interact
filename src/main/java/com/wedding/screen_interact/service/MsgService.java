package com.wedding.screen_interact.service;

import java.util.List;
import java.util.Map;

/**
 * @author xuzhentao
 * @ClassName: MsgService
 * @description: TODO
 * @date 2019/8/21 15:38
 */
public interface MsgService {
    /**
     * 查询消息列表
     * @return
     */
    public List<Map<String,String>> getMsg();

    /**
     * 删除消息
     * @param msgId
     * @return
     */
    public int deleteMsg(String msgId);
}
