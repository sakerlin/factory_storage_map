import fs from 'fs';
import path from 'path';

const PAGE_IDS = ['main', 'A', 'BC', 'D', 'E', 'F', 'G', 'I', 'J', 'H'];

function buildManualFTemplate() {
  const columns = [
    { left: 0, right: 480, names: ['F5', 'F6', 'F7', 'F8', 'F9'] },
    { left: 480, right: 960, names: ['F0', 'F1', 'F2', 'F3', 'F4'] },
  ];
  const rowBounds = [0, 361, 723, 1085, 1447, 1806];
  const areas = [];
  const overlays = [];

  columns.forEach(column => {
    column.names.forEach((name, index) => {
      const top = rowBounds[index];
      const bottom = rowBounds[index + 1];
      const width = column.right - column.left;
      const height = bottom - top;

      areas.push({
        name,
        shape: 'rect',
        coords: [column.left, top, column.right, bottom],
        title: name,
        target: name,
        href: name,
      });

      overlays.push({
        className: `sb_area area_${name}`,
        name,
        style: `left:${column.left}px;top:${top}px;width:${width}px;height:${height}px;`,
        innerHtml: '',
      });
    });
  });

  return {
    page: 'F',
    mode: 'detail',
    imageSrc: 'images/factory_f_all.png',
    mapId: 'factory_F_zone',
    mapName: 'factory_F_zone',
    rawHtml: '',
    areas,
    overlays,
  };
}

function extractBlock(content, page) {
  const marker = `if($page=="${page}"){`;
  const start = content.indexOf(marker);
  if (start === -1) {
    throw new Error(`Unable to find template block for page ${page}`);
  }

  const htmlStart = content.indexOf('?>', start);
  const htmlEnd = content.indexOf('<?', htmlStart + 2);
  if (htmlStart === -1 || htmlEnd === -1) {
    throw new Error(`Unable to extract HTML template for page ${page}`);
  }

  return content.slice(htmlStart + 2, htmlEnd).trim();
}

function parseAttributes(fragment) {
  const attributes = {};
  const regex = /([A-Za-z_:][A-Za-z0-9_:\-]*)="([^"]*)"/g;
  let match = regex.exec(fragment);
  while (match) {
    attributes[match[1]] = match[2];
    match = regex.exec(fragment);
  }
  return attributes;
}

function parseAreas(html) {
  const areaRegex = /<area\b([^>]*?)\/?>/g;
  const areas = [];
  let match = areaRegex.exec(html);
  while (match) {
    const attrs = parseAttributes(match[1]);
    areas.push({
      name: attrs.name || '',
      shape: attrs.shape || 'rect',
      coords: (attrs.coords || '')
        .split(',')
        .map(value => value.trim())
        .filter(Boolean)
        .map(value => Number(value)),
      title: attrs.title || attrs.alt || attrs.name || '',
      target: attrs.target || '',
      href: attrs.href || '#',
    });
    match = areaRegex.exec(html);
  }
  return areas.filter(area => area.name);
}

function parseOverlays(html) {
  const overlayRegex = /<div class="([^"]+)" name="([^"]+)"(?: style="([^"]*)")?>([\s\S]*?)<\/div>/g;
  const overlays = [];
  let match = overlayRegex.exec(html);
  while (match) {
    overlays.push({
      className: match[1],
      name: match[2],
      style: match[3] || '',
      innerHtml: match[4].trim(),
    });
    match = overlayRegex.exec(html);
  }
  return overlays;
}

function parseTemplate(page, html) {
  const imageMatch = html.match(/<img src="([^"]+)"/);
  const mapMatch = html.match(/<map\s+id="([^"]+)"\s+name="([^"]+)">/i);

  return {
    page,
    mode: page === 'main' ? 'overview' : 'detail',
    imageSrc: imageMatch ? imageMatch[1] : '',
    mapId: mapMatch ? mapMatch[1] : '',
    mapName: mapMatch ? mapMatch[2] : '',
    rawHtml: html,
    areas: parseAreas(html),
    overlays: parseOverlays(html),
  };
}

export function loadLegacyTemplates(legacyRootDir) {
  const sourcePath = path.join(legacyRootDir, 'modules', 'skp_op.php');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const templates = {};

  PAGE_IDS.forEach(page => {
    if (page === 'F') {
      templates[page] = buildManualFTemplate();
      return;
    }
    templates[page] = parseTemplate(page, extractBlock(source, page));
  });

  return templates;
}
