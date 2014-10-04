/*
 * robot.xc
 *
 *  Created on: Oct 3, 2014
 *      Author: Joseph Warner
 */

#include <platform.h>
#include <xs1.h>
#include <timer.h>
#include "uart_rx.h"

port p = XS1_PORT_1A;

int main() {
    while (1) {
        p <: 0;
        delay_milliseconds(200);
        p <: 1;
        delay_milliseconds(200);
     }
    return 0;
}
