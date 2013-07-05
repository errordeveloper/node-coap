#!/usr/bin/env node node_modules/nodeunit/bin/nodeunit

var CoAPParser = require('../build/Release/coap_parser');

exports['Equivalence mapping'] = function (test) {

  var packet = new Buffer('420174aa73aa3d0d636f6e636f72642e6f72696f6e2e64656570646172632e636f6d88736563757269747903702d31005128','hex');
  var packet_parsed = CoAPParser.parsePacket(packet);
  var packet_reconstructed = new Buffer(CoAPParser.constructPacket(packet_parsed),'binary');
  var packet_reparsed = CoAPParser.parsePacket(packet_reconstructed);

  test.equal( packet.toString('hex'), packet_reconstructed.toString('hex'),
      'Recosntructed buffer from parser should be consistent with original packet' );

  test.deepEqual( packet_parsed, packet_reparsed,
      'Parsed objects from original packet and reconstructed packet should be consistent' );

  test.equal( packet_parsed.code, 1 );
  test.equal( packet_parsed.tt, 0 );
  test.equal( packet_parsed.msgid, 43636 );
  test.equal( packet_parsed.version, 1 );
  test.equal( packet_parsed.token[0], 's' );
  test.equal( packet_parsed.options['3'], 'concord.orion.deepdarc.com' );
  test.equal( packet_parsed.options['11'][0], 'security' );

  test.done();

}
