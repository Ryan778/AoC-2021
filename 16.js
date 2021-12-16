// Day 16

/** Comments: 
 * Didn't learn graph terminology until about two weeks ago. Looks like now I need to put it to use as if I've been doing it full-time! Ahhhhhhh!
 * Part 1: 
 * - First bug: Missing padStart when parsing input, which meant leading 0's weren't included, took ~20 min to catch
 * - Second bug: When calling console.log, one of the slice indices was incorrect, which meant I was trying to debug off of incorrectly logged data, took ~5-10 min to catch
 * - Third bug (hardest): readPacket wasn't calculating the length of the packet (for packets with a length type ID of 1). Went on many red herrings to chase this down, it ended up being a one-line issue (commented as "this was the bug"). The comment "bug??" was a red herring. ~30-40 min to catch
 * Part 2: 
 * - The graph traversal addon went really smoothly and only took ~10 minutes to write. However, it didn't work due to a bug from part 1 (that didn't affect part 1's results, but does affect part 2's)
 * - The big bug: When reading operator packets with a length type ID of 1, an off-by-one error existed for decrementing "packets remaining". It didn't take into account the starting packet as a packet, so it'd always read one more packet than it was supposed to. ~50 min to catch, and even then that's with the help of a family member helping me use a debugger. 
 */

const rl = require('./rl-tools'); 
const colors = require('colors');
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  let input = inpStr.split('').map(r => parseInt(r, 16).toString(2).padStart(4, '0')).join('');
  // console.log(input); 

  // if (input.length > 500) return 1;

  let packets = []; 
  function readPacket(packet, readAll, readCount, rl=0) {
    if (packet.indexOf('1') === -1) return rl + packet.length;
    let readLength = 6; 
    let version = parseInt(packet.slice(0, 3), 2); 
    let typeID = parseInt(packet.slice(3, 6), 2);
    if (typeID !== 4) {
      // operator
      let ltypeID = parseInt(packet.slice(6, 7), 2); 
      if (ltypeID === 0) {
        // length given
        console.log(version, typeID, `${packet.slice(0,6).green}${packet.slice(6,7)}${packet.slice(7,22).blue}${packet.slice(22)}`, readAll);
        let nextPacketLength = parseInt(packet.slice(7, 22), 2);
        readLength += 16; 
        packet = packet.slice(22); 
        packets.push({version, typeID, readLength, nextPacketLength}); 
        let totalLength = readPacket(packet.slice(0, nextPacketLength), true); 
        rl += totalLength;
        console.log('!', totalLength, nextPacketLength);
        packet = packet.slice(nextPacketLength); 
      } else {
        // num of packets given
        console.log(version, typeID, `${packet.slice(0,6).green}${packet.slice(6,7)}${packet.slice(7,18).magenta}${packet.slice(18)}`);
        let spCount = parseInt(packet.slice(7, 18), 2);
        readLength += 12; 
        packet = packet.slice(18); 
        let totalLength = readPacket(packet, false, spCount); 
        rl += totalLength; // this was the bug (missing this line, very important)
        packets.push({version, typeID, numPackets: spCount, readLength, totalLength}); 
        // console.log(totalLength, packet.red, packet.slice(totalLength)); 
        packet = packet.slice(totalLength); // bug??
        // packet = ''; 
      }
    } else {
      console.log(version, typeID, `${packet.slice(0,6).blue}${packet.slice(6)}`);
      // literal value
      packet = packet.slice(6); 
      let pval = ''; 
      while (packet.charAt(0) !== '0') {
        pval += packet.slice(1, 5); 
        packet = packet.slice(5); 
        readLength += 5; 
      }
      // Final packet
      pval += packet.slice(1, 5); 
      readLength += 5; 
      packet = packet.slice(5); 
      let value = parseInt(pval, 2); 
      packets.push({version, typeID, value, readLength}); 
    }

    if (readAll && packet.length > 0) {
      console.log('ra', packet);
      rl += readPacket(packet, true); 
    }
    if (typeof readCount === 'number' && readCount > 0) {
      // console.log(readCount); 
      return rl + readPacket(packet, false, (readCount - 1), readLength); 
    }
    return rl + readLength;
  }

  console.log(readPacket(input, true, null, 0));
  // readPacket('10000000000000101111010001111000');
  // readPacket('11101110000000001101010000001100100000100011000001100000', true);
  // readPacket('00111000000000000110111101000101001010010001001000000000', true);
  console.log(packets); 

  let versum = 0; 
  for (let i of packets) {
    versum += i.version; 
  }
  return versum;
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let input = inpStr.split('').map(r => parseInt(r, 16).toString(2).padStart(4, '0')).join('');
  // console.log(input); 

  // if (input.length > 500) return 1;

  let packets = []; 

  function readPacket(packet, readAll, readCount, rl=0, node=packets) {
    if (packet.indexOf('1') === -1) return rl + packet.length;
    let readLength = 6; 
    let version = parseInt(packet.slice(0, 3), 2); 
    let typeID = parseInt(packet.slice(3, 6), 2);
    if (typeID !== 4) {
      // operator
      let ltypeID = parseInt(packet.slice(6, 7), 2); 
      if (ltypeID === 0) {
        // length given
        // console.log(version, typeID, `${packet.slice(0,6).green}${packet.slice(6,7)}${packet.slice(7,22).blue}${packet.slice(22)}`, readAll);
        let nextPacketLength = parseInt(packet.slice(7, 22), 2);
        readLength += 16; 
        packet = packet.slice(22); 
        let subtree = {version, typeID, rlf: 0, children: []}; 
        let totalLength = readPacket(packet.slice(0, nextPacketLength), true, 0, 0, subtree.children); 
        // console.log(1, node, subtree); 
        node.push(subtree); 
        rl += totalLength;
        // console.log('!', totalLength, nextPacketLength);
        packet = packet.slice(nextPacketLength); 
      } else {
        // num of packets given
        // console.log(version, typeID, `${packet.slice(0,6).green}${packet.slice(6,7)}${packet.slice(7,18).magenta}${packet.slice(18)}`, node); // also log current node
        console.log(version, typeID, `${packet.slice(0,6).green}${packet.slice(6,7)}${packet.slice(7,18).magenta}${packet.slice(18)}`);
        let spCount = parseInt(packet.slice(7, 18), 2);
        readLength += 12; 
        packet = packet.slice(18); 
        let subtree = {version, typeID, rlf: 1, children: []}; 
        let totalLength = readPacket(packet, false, spCount, 0, subtree.children); 
        rl += totalLength; 
        // console.log(2, node, subtree); 
        node.push(subtree); 
        // console.log(totalLength, packet.red, packet.slice(totalLength)); 
        packet = packet.slice(totalLength); // bug??
        // packet = ''; 
      }
    } else {
      console.log(version, typeID, `${packet.slice(0,6).blue}${packet.slice(6)}`);
      // literal value
      packet = packet.slice(6); 
      let pval = ''; 
      while (packet.charAt(0) !== '0') {
        pval += packet.slice(1, 5); 
        packet = packet.slice(5); 
        readLength += 5; 
      }
      // Final packet
      pval += packet.slice(1, 5); 
      readLength += 5; 
      packet = packet.slice(5); 
      let value = parseInt(pval, 2); 
      // packets.push({version, typeID, value, readLength}); 
      node.push({version, typeID, value, end: true}); 
    }

    if (readAll && packet.length > 0) {
      // console.log('ra', packet);
      rl += readPacket(packet, true, 0, 0, node); 
    }
    if (typeof readCount === 'number' && readCount > 1) {
      // console.log(9, readCount); 
      return rl + readPacket(packet, false, (readCount - 1), readLength, node); 
    }
    return rl + readLength;
  }

  console.log(readPacket(input, true, null, 0));
  // readPacket('10000000000000101111010001111000');
  // readPacket('11101110000000001101010000001100100000100011000001100000', true);
  // readPacket('00111000000000000110111101000101001010010001001000000000', true);

  function traverse(node) {
    if (node.typeID === 4) return node.value; 
    node.childValues = []; 
    for (let i = 0; i < node.children.length; i++) {
      node.childValues[i] = traverse(node.children[i]); 
    }
    switch (node.typeID) {
      case 0: 
        return rl.array.sum(node.childValues); 
      case 1: 
        return rl.array.product(node.childValues); 
      case 2: 
        return Math.min(...node.childValues); 
      case 3: 
        return Math.max(...node.childValues); 
      case 5: 
        return (node.childValues[0] > node.childValues[1] ? 1 : 0)
      case 6: 
        return (node.childValues[0] < node.childValues[1] ? 1 : 0)
      case 7: 
        return (node.childValues[0] === node.childValues[1] ? 1 : 0)
    }
  }
  let res = traverse(packets[0]); 
  // console.log(JSON.stringify(packets[0], null, 3)); 
  return res; 

  // let 

  // let versum = 0; 
  // for (let i of packets) {
  //   versum += i.version; 
  // }
  // return versum;
  return 1;
}; 