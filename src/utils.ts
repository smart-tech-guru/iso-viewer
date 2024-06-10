import { Box } from "./types";

/**
 * Parses an MP4 file represented as an ArrayBuffer and extracts box information.
 *
 * @param data ArrayBuffer containing the MP4 file data
 * @returns Promise containing an object with boxes array and mdat Uint8Array (if present)
 */
export async function parseMp4(data: ArrayBuffer): Promise<{ boxes: Box[]; mdat: Uint8Array | null }> {
  const boxes: Box[] = [];
  let mdat: Uint8Array | null = null; // Initialize mdat to null
  const view = new DataView(data);  // Create a DataView to efficiently read the ArrayBuffer
  let offset = 0;

  // Recursive function to parse individual boxes within the MP4 file
  const parseBox = (data: DataView, offset: number): Box => {
    const size = data.getUint32(offset);
    // Decode the type of the box from the data buffer
    const type = new TextDecoder().decode(new Uint8Array(data.buffer, offset + 4, 4));
    const box: Box = { type, size, offset }; // Create a Box object with type, size, and offset

    // Handle special cases for 'moof', 'traf', and 'mdat' box types
    if (type === 'moof' || type === 'traf') {
      box.children = [];
      let childOffset = offset + 8;
      while (childOffset < offset + size) {
        const childBox = parseBox(data, childOffset);
        box.children.push(childBox);
        childOffset += childBox.size;
      }
    } else if (type === 'mdat') {
      // Extract mdat data as a Uint8Array
      mdat = new Uint8Array(data.buffer, offset + 8, size - 8);
    }

    return box;
  };

  // Start parsing boxes in the MP4 file
  while (offset < data.byteLength) {
    const box = parseBox(view, offset);
    boxes.push(box);
    offset += box.size;
  }

  return { boxes, mdat };
}
