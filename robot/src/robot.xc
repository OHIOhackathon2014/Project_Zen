/*
 * robot.xc
 *
 *  Created on: Oct 3, 2014
 *      Author: Joseph Warner
 */

#include <platform.h>
#include <xs1.h>
#include <print.h>
#include <timer.h>
#include "uart_rx.h"
#include "uart_tx.h"

clock refClk = XS1_CLKBLK_REF;

in port rx = XS1_PORT_1A;
out port tx = XS1_PORT_1B;

void produce(streaming chanend c) {
    for(int i = 0; i < 256; i++) {
        c <: (unsigned char) i;
    }
}

void consume(streaming chanend c) {
    unsigned char buf[256];
    for(int i = 0; i < 200; i++) {
      c :> buf[i];
    }
    for(int i = 0; i < 200; i++) {
      printhexln(buf[i]);

    }
}

int main() {
    streaming chan c, d;
    configure_out_port_no_ready(tx, refClk, 1);
    configure_in_port_no_ready(rx, refClk);
    clearbuf(rx);
    par {
        produce(d);
        consume(c);
        uart_tx_fast(tx, d, 100);
        uart_rx_fast(rx, c, 100);
    }
    return 0;
}
