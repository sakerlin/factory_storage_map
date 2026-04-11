import { useMemo, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: relative;
  overflow: auto;
  border-radius: 20px;
  background: #d8dde6;
  padding: 18px;
  min-height: 560px;
`;

const Canvas = styled.div`
  position: relative;
  width: fit-content;

  img.base-map {
    display: block;
    max-width: none;
  }

  .ls_area,
  .sb_area {
    display: none;
    pointer-events: none;
  }
`;

const OverlayHost = styled.div`
  .is-highlighted {
    display: block !important;
  }
`;

function attrsToStyle(styleText) {
  if (!styleText) return undefined;
  const style = {};
  styleText
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .forEach(part => {
      const [key, value] = part.split(':');
      if (!key || !value) return;
      const normalizedKey = key.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      style[normalizedKey] = value.trim();
    });
  return style;
}

function normalizeOverlayHtml(html) {
  if (!html) return '';
  return html.replace(/(src=)(["'])images\//gi, '$1$2/legacy/images/');
}

const coordsToShape = area => area.coords.join(',');

const MapCanvas = ({ template, onAreaHover, onAreaLeave, onAreaClick, activeAreaName }) => {
  const [hoveredArea, setHoveredArea] = useState('');

  const overlays = useMemo(() => template.overlays || [], [template.overlays]);
  const highlightName = activeAreaName || hoveredArea;
  const normalizedHighlightName = useMemo(() => {
    if (!highlightName) return '';
    return template.mode === 'overview' ? `area_${highlightName}` : highlightName;
  }, [highlightName, template.mode]);

  return (
    <Wrap>
      <Canvas>
        <img
          className="base-map"
          src={`/legacy/${template.imageSrc}`}
          useMap={`#${template.mapName}`}
          alt={`${template.page} map`}
        />
        <map name={template.mapName} id={template.mapId}>
          {template.areas.map(area => (
            <area
              key={area.name}
              shape={area.shape}
              coords={coordsToShape(area)}
              href={area.href || '#'}
              alt={area.title}
              title={area.title}
              onMouseEnter={() => {
                setHoveredArea(area.name);
                onAreaHover?.(area);
              }}
              onMouseLeave={() => {
                setHoveredArea('');
                onAreaLeave?.(area);
              }}
              onClick={event => {
                event.preventDefault();
                onAreaClick?.(area);
              }}
            />
          ))}
        </map>
        <OverlayHost>
          {overlays.map(overlay => (
            <div
              key={`${overlay.className}-${overlay.name}`}
              className={`${overlay.className} ${normalizedHighlightName === overlay.name ? 'is-highlighted' : ''}`}
              name={overlay.name}
              style={attrsToStyle(overlay.style)}
              dangerouslySetInnerHTML={{ __html: normalizeOverlayHtml(overlay.innerHtml) }}
            />
          ))}
        </OverlayHost>
      </Canvas>
    </Wrap>
  );
};

export default MapCanvas;
