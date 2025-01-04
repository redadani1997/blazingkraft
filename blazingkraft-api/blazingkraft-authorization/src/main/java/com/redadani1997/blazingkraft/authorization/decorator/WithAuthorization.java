package com.redadani1997.blazingkraft.authorization.decorator;

import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.lang.annotation.*;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface WithAuthorization {
    String permission();

    EntityType type();
}
