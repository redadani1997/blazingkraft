package com.redadani1997.blazingkraft.cleanup.decorator;

import java.lang.annotation.*;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface WithCleanUp {}
