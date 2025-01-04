package com.redadani1997.blazingkraft.common.model;

import java.util.LinkedList;

public class CommonCircularList<T> extends LinkedList<T> {
    private int maxSize;

    public CommonCircularList(int maxSize) {
        this.maxSize = maxSize;
    }

    @Override
    public boolean add(T t) {
        if (this.size() >= maxSize) {
            this.removeLast();
        }
        this.addFirst(t);
        return true;
    }
}
