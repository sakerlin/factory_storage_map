import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiClient } from '../api/client.js';
import MapCanvas from '../components/MapCanvas.jsx';

const STORAGE_PANEL_OFFSET_KEY = 'factory-map-storage-panel-offset-x';

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.section`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: rgba(15, 23, 42, 0.08) 0 10px 30px;
  overflow: hidden;
`;

const MapStage = styled.div`
  display: grid;
  align-items: start;

  > * {
    grid-area: 1 / 1;
  }
`;

const CardHeader = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  p {
    margin: 6px 0 0;
    color: #475569;
    line-height: 1.5;
  }
`;

const MapHeader = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
  gap: 16px;
  align-items: start;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  p {
    margin: 6px 0 0;
    color: #475569;
    line-height: 1.5;
  }
`;

const SidebarBody = styled.div`
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
`;

const QuickNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const QuickNavButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 8px 12px;
  background: ${props => (props.$active ? '#2563eb' : '#e2e8f0')};
  color: ${props => (props.$active ? '#ffffff' : '#0f172a')};
  cursor: pointer;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #334155;
  line-height: 1.5;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  border: 0;
  border-radius: 12px;
  padding: 12px 14px;
  background: ${props => (props.$secondary ? '#e2e8f0' : '#2563eb')};
  color: ${props => (props.$secondary ? '#0f172a' : '#ffffff')};
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 12px 14px;
  background: #f8fafc;
`;

const DataNotice = styled.div`
  padding: 12px 14px;
  border-radius: 14px;
  background: ${props => (props.$tone === 'warn' ? '#fff7ed' : '#eff6ff')};
  color: ${props => (props.$tone === 'warn' ? '#9a3412' : '#1d4ed8')};
  border: 1px solid ${props => (props.$tone === 'warn' ? '#fdba74' : '#bfdbfe')};
  line-height: 1.5;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  h3 {
    margin: 0;
    font-size: 0.95rem;
    color: #0f172a;
  }

  span {
    color: #64748b;
    font-size: 0.85rem;
  }
`;

const AreaSelect = styled.select`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 12px 14px;
  background: #ffffff;
  color: #0f172a;
`;

const StorageList = styled.div`
  max-height: 320px;
  overflow: auto;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
`;

const FloatingStoragePanel = styled.div.attrs(props => ({
  style: {
    top: `${props.$top}px`,
    left: `${props.$left}px`,
    width: `${props.$width}px`,
    transform: `translateX(${props.$offsetX}px)`
  }
}))`
  position: fixed;
  will-change: transform;
  max-height: 420px;
  z-index: 4;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: rgba(15, 23, 42, 0.16) 0 18px 36px;
  border-radius: 18px;
  backdrop-filter: blur(10px);
  overflow: hidden;

  @media (max-width: 720px) {
    position: static !important;
    width: auto !important;
    max-width: none !important;
    max-height: none !important;
    margin: 16px 18px 0 !important;
    transform: none !important;
  }
`;

const FloatingHeader = styled.div`
  height: 52px;
  flex-shrink: 0;
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(248, 250, 252, 0.96);
  cursor: grab;
  user-select: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:active {
    cursor: grabbing;
  }

  strong {
    color: #0f172a;
    line-height: 1.5;
    white-space: nowrap;
  }

  span {
    color: #64748b;
    font-size: 0.8rem;
    white-space: nowrap;
    line-height: 1.5;
  }
`;

const FloatingBody = styled.div`
  padding: 0 16px 14px;
`;

const FloatingMeta = styled.div`
  padding: 12px 0 0;
  color: #64748b;
  font-size: 0.88rem;
  line-height: 1.4;
`;

const StorageItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;

  strong {
    display: block;
    color: #0f172a;
  }

  span {
    color: #475569;
    display: block;
    margin-top: 4px;
    line-height: 1.4;
  }
`;

const Empty = styled.p`
  margin: 0;
  color: #64748b;
  line-height: 1.6;
`;

const CornerPicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    color: #64748b;
    font-size: 0.85rem;
    text-align: right;
  }

  @media (max-width: 720px) {
    span {
      text-align: left;
    }
  }
`;

const FactoryMapPage = () => {
  const mapStageRef = useRef(null);
  const dragStateRef = useRef({
    active: false,
    pointerStartX: 0,
    offsetStartX: 0,
  });
  const { pageId = 'main' } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [maps, setMaps] = useState([]);
  const [storageMeta, setStorageMeta] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [storageData, setStorageData] = useState({ total: 0, results: [], error: '', source: '' });
  const [loadingStorage, setLoadingStorage] = useState(false);
  const [refreshingCache, setRefreshingCache] = useState(false);
  const [areaQuery, setAreaQuery] = useState('');
  const [areaSelectValue, setAreaSelectValue] = useState('');
  const [floatingPanelStyle, setFloatingPanelStyle] = useState({
    top: 96,
    left: 24,
    width: 320,
    minOffsetX: 0,
    maxOffsetX: 0,
  });
  const [floatingPanelOffsetX, setFloatingPanelOffsetX] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const stored = window.localStorage.getItem(STORAGE_PANEL_OFFSET_KEY);
    const numeric = Number(stored);
    return Number.isFinite(numeric) ? numeric : 0;
  });
  const deferredAreaQuery = useDeferredValue(areaQuery);

  useEffect(() => {
    apiClient.getMaps().then(payload => setMaps(payload.pages || [])).catch(() => setMaps([]));
    apiClient.getStorageMeta().then(setStorageMeta).catch(() => setStorageMeta(null));
  }, []);

  useEffect(() => {
    apiClient.getMap(pageId).then(setTemplate).catch(() => setTemplate(null));
    setHoveredArea(null);
    setSelectedArea(null);
    setAreaQuery('');
    setAreaSelectValue('');
    setStorageData({ total: 0, results: [], error: '', source: '' });
  }, [pageId]);

  useEffect(() => {
    function updateFloatingPanelPosition() {
      const element = mapStageRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const width = Math.min(320, Math.max(260, rect.width - 36));
      const baseLeft = Math.max(18, rect.left + 18);
      const rightPadding = 18;
      const top = Math.max(82, rect.top + 18);
      const minLeft = 18;
      const maxLeft = Math.max(minLeft, viewportWidth - width - rightPadding);
      const minOffsetX = minLeft - baseLeft;
      const maxOffsetX = maxLeft - baseLeft;

      setFloatingPanelStyle({
        top,
        left: baseLeft,
        width,
        minOffsetX,
        maxOffsetX,
      });
    }

    updateFloatingPanelPosition();
    window.addEventListener('resize', updateFloatingPanelPosition);
    window.addEventListener('scroll', updateFloatingPanelPosition, { passive: true });

    return () => {
      window.removeEventListener('resize', updateFloatingPanelPosition);
      window.removeEventListener('scroll', updateFloatingPanelPosition);
    };
  }, [template, pageId]); // Removed floatingPanelOffsetX to prevent layout thrashing during drag

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const clamped = Math.min(floatingPanelStyle.maxOffsetX, Math.max(floatingPanelStyle.minOffsetX, floatingPanelOffsetX));
    window.localStorage.setItem(STORAGE_PANEL_OFFSET_KEY, String(clamped));
  }, [floatingPanelOffsetX]);

  const title = useMemo(() => {
    if (!template) return 'Loading map';
    return template.page === 'main' ? '工廠總覽' : `${template.page} 區地圖`;
  }, [template]);

  const activeArea = hoveredArea || selectedArea;
  const helperText = template?.mode === 'overview'
    ? '滑過區域可看高亮，點擊可進入分區地圖。'
    : '滑過子區塊可預覽，點擊後會固定選取並顯示儲位內容。';

  const filteredAreas = useMemo(() => {
    const areas = template?.areas || [];
    const keyword = deferredAreaQuery.trim().toUpperCase();
    if (!keyword) return areas;
    return areas.filter(area => area.name.toUpperCase().includes(keyword) || area.title.toUpperCase().includes(keyword));
  }, [deferredAreaQuery, template]);

  async function refreshStorageMeta() {
    const nextMeta = await apiClient.getStorageMeta();
    setStorageMeta(nextMeta);
  }

  async function loadStorageForArea(area) {
    if (!template || !area) return;

    setLoadingStorage(true);
    try {
      const payload = template.mode === 'overview'
        ? await apiClient.getZoneStorage(area.name)
        : await apiClient.getSubAreaStorage(area.name);
      setStorageData(payload);
      await refreshStorageMeta();
    } catch (error) {
      setStorageData({ total: 0, results: [], error: error.message, source: '' });
    } finally {
      setLoadingStorage(false);
    }
  }

  async function handleAreaHover(area) {
    if (dragStateRef.current.active) return;
    setHoveredArea(area);
    setAreaSelectValue(area.name);
    await loadStorageForArea(area);
  }

  function handleAreaLeave() {
    setHoveredArea(null);
  }

  function handleAreaClick(area) {
    if (!template) return;
    if (template.mode === 'overview') {
      navigate(`/maps/${area.name}`);
      return;
    }
    setSelectedArea(area);
    setAreaSelectValue(area.name);
    loadStorageForArea(area);
  }

  function handleAreaSelectChange(event) {
    const nextName = event.target.value;
    setAreaSelectValue(nextName);
    const nextArea = filteredAreas.find(area => area.name === nextName) || template?.areas?.find(area => area.name === nextName);
    if (!nextArea) return;
    if (template?.mode === 'overview') {
      navigate(`/maps/${nextArea.name}`);
      return;
    }
    setSelectedArea(nextArea);
    loadStorageForArea(nextArea);
  }

  async function handleRefreshCache() {
    setRefreshingCache(true);
    try {
      await apiClient.refreshStorageCache();
      await refreshStorageMeta();
      if (activeArea) {
        await loadStorageForArea(activeArea);
      }
    } catch (error) {
      setStorageData({
        total: storageData.total,
        results: storageData.results,
        source: storageData.source,
        error: error.message,
      });
    } finally {
      setRefreshingCache(false);
    }
  }

  function handleFloatingHeaderPointerDown(event) {
    if (window.innerWidth <= 720) return;
    dragStateRef.current = {
      active: true,
      pointerStartX: event.clientX,
      offsetStartX: floatingPanelOffsetX,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handleFloatingHeaderPointerMove(event) {
    if (!dragStateRef.current.active) return;
    const rawOffset = dragStateRef.current.offsetStartX + (event.clientX - dragStateRef.current.pointerStartX);
    const nextOffset = Math.min(floatingPanelStyle.maxOffsetX, Math.max(floatingPanelStyle.minOffsetX, rawOffset));
    setFloatingPanelOffsetX(nextOffset);
  }

  function handleFloatingHeaderPointerUp(event) {
    dragStateRef.current.active = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }

  return (
    <Layout>
      <Card>
        <MapHeader>
          <div>
            <h2>{title}</h2>
            <p>{helperText}</p>
          </div>
          <CornerPicker>
            <span>{template?.mode === 'overview' ? '可進入的區域' : '子區塊清單'}</span>
            {filteredAreas.length === 0 ? (
              <Empty>找不到符合的區塊。</Empty>
            ) : (
              <AreaSelect
                value={areaSelectValue}
                onChange={handleAreaSelectChange}
              >
                <option value="">
                  {template?.mode === 'overview' ? '選擇要進入的區域' : '選擇子區塊'}
                </option>
                {filteredAreas.map(area => (
                  <option key={area.name} value={area.name}>
                    {area.name}{area.title && area.title !== area.name ? ` / ${area.title}` : ''}
                  </option>
                ))}
              </AreaSelect>
            )}
          </CornerPicker>
        </MapHeader>
        {template ? (
          <MapStage ref={mapStageRef}>
            <MapCanvas
              template={template}
              activeAreaName={activeArea?.name}
              onAreaHover={handleAreaHover}
              onAreaLeave={handleAreaLeave}
              onAreaClick={handleAreaClick}
            />
            <FloatingStoragePanel
              $top={floatingPanelStyle.top}
              $left={floatingPanelStyle.left}
              $width={floatingPanelStyle.width}
              $offsetX={Math.min(floatingPanelStyle.maxOffsetX, Math.max(floatingPanelStyle.minOffsetX, floatingPanelOffsetX))}
            >
              <FloatingHeader
                onPointerDown={handleFloatingHeaderPointerDown}
                onPointerMove={handleFloatingHeaderPointerMove}
                onPointerUp={handleFloatingHeaderPointerUp}
                onPointerCancel={handleFloatingHeaderPointerUp}
              >
                <strong>庫存列表</strong>
                <span>可拖曳左右移動</span>
              </FloatingHeader>
              <FloatingBody>
                <FloatingMeta>
                  {activeArea?.name ? `目前區塊：${activeArea.name}` : '尚未選取區塊'}
                </FloatingMeta>
                <StorageList>
                  {loadingStorage ? (
                    <Empty>讀取儲位資料中...</Empty>
                  ) : storageData.error ? (
                    <Empty>目前無法取得儲位資料：{storageData.error}</Empty>
                  ) : storageData.results.length === 0 ? (
                    <Empty>{template?.mode === 'overview' ? '滑過總覽區域後，這裡會顯示該區品項。' : '滑過分區後，這裡會顯示品號與品名。'}</Empty>
                  ) : (
                    storageData.results.map(item => (
                      <StorageItem key={`${item.zone}-${item.area}-${item.pdnum}`}>
                        <strong>{item.pdnum}</strong>
                        <span>{item.pdName}</span>
                        <span>
                          {item.zone}
                          {item.area}
                          {item.code ? ` / ${item.code}` : ''}
                          {item.storageNum ? ` / 庫存 ${item.storageNum}` : ''}
                        </span>
                      </StorageItem>
                    ))
                  )}
                </StorageList>
              </FloatingBody>
            </FloatingStoragePanel>
          </MapStage>
        ) : (
          <SidebarBody>
            <Empty>無法載入地圖資料。</Empty>
          </SidebarBody>
        )}
      </Card>

      <Card>
        <CardHeader>
          <h2>區域資訊</h2>
          <p>顯示目前滑過或選取的區塊與儲位內容。</p>
        </CardHeader>
        <SidebarBody>
          <QuickNav>
            {maps.map(map => (
              <QuickNavButton
                key={map.page}
                type="button"
                $active={map.page === pageId}
                onClick={() => navigate(`/maps/${map.page}`)}
              >
                {map.page}
              </QuickNavButton>
            ))}
          </QuickNav>

          <Meta>
            <strong>目前頁面：{pageId}</strong>
            <span>目前區塊：{activeArea?.name || '尚未選取'}</span>
            <span>區塊數量：{template?.areas?.length || 0}</span>
            <span>資料來源：{storageData.source || '尚未查詢'}</span>
          </Meta>

          {storageMeta && (
            <DataNotice $tone={storageMeta.database?.state === 'connected' ? 'info' : 'warn'}>
              {storageMeta.database?.state === 'connected'
                ? '資料庫目前可連線，快取可作為離線備援。'
                : `資料庫目前不可用，將改讀本地快取。${storageMeta.cache?.isEmpty ? '目前快取還是空的。' : ''}`}
              <br />
              快取時間：{storageMeta.cache?.generatedAt || '尚未建立'}
              <br />
              手動資料檔：{storageMeta.manual?.path || '未設定'}
              {storageMeta.manual?.updatedAt ? ` / 手動更新時間：${storageMeta.manual.updatedAt}` : ''}
            </DataNotice>
          )}

          <ActionRow>
            {pageId !== 'main' && (
              <ActionButton $secondary onClick={() => navigate('/maps/main')}>
                回到總覽
              </ActionButton>
            )}
            <ActionButton type="button" onClick={handleRefreshCache} disabled={refreshingCache}>
              {refreshingCache ? '更新快取中...' : '刷新本地快取 / 手動資料'}
            </ActionButton>
          </ActionRow>

          <Section>
            <SectionTitle>
              <h3>區塊搜尋</h3>
              <span>{filteredAreas.length} 筆</span>
            </SectionTitle>
            <SearchInput
              value={areaQuery}
              onChange={event => setAreaQuery(event.target.value)}
              placeholder={template?.mode === 'overview' ? '搜尋區域，例如 A、BC、J' : '搜尋子區塊，例如 A1、D4'}
            />
            {filteredAreas.length === 0 && <Empty>找不到符合的區塊。</Empty>}
          </Section>
        </SidebarBody>
      </Card>
    </Layout>
  );
};

export default FactoryMapPage;
