import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { apiClient } from '../api/client.js';

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.section`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: rgba(15, 23, 42, 0.08) 0 18px 40px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

const CardHeader = styled.div`
  padding: 20px 22px;
  border-bottom: 1px solid #e5e7eb;
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(14, 165, 233, 0.02)),
    #ffffff;

  h2, h3 {
    margin: 0;
    color: #0f172a;
  }

  p {
    margin: 8px 0 0;
    color: #475569;
    line-height: 1.6;
  }
`;

const CardBody = styled.div`
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #334155;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 12px 14px;
  background: #f8fafc;
  color: #0f172a;

  &:disabled {
    background: #e2e8f0;
    color: #475569;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 12px 14px;
  background: #f8fafc;
  color: #0f172a;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  border: 0;
  border-radius: 14px;
  padding: 12px 16px;
  background: ${props => {
    if (props.$danger) return '#dc2626';
    if (props.$secondary) return '#e2e8f0';
    return '#0f172a';
  }};
  color: ${props => (props.$secondary ? '#0f172a' : '#ffffff')};
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  border-radius: 16px;
  padding: 14px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;

  strong {
    display: block;
    color: #0f172a;
    font-size: 1.05rem;
  }

  span {
    display: block;
    margin-top: 6px;
    color: #64748b;
  }
`;

const Notice = styled.div`
  border-radius: 16px;
  padding: 14px 16px;
  background: ${props => (props.$error ? '#fef2f2' : '#f0fdf4')};
  color: ${props => (props.$error ? '#991b1b' : '#166534')};
  border: 1px solid ${props => (props.$error ? '#fecaca' : '#bbf7d0')};
  line-height: 1.6;
`;

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 680px;
  overflow: auto;
`;

const RecordCard = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid ${props => (props.$active ? '#0f172a' : '#e2e8f0')};
  background: ${props => (props.$active ? '#f8fafc' : '#ffffff')};
  border-radius: 18px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: #94a3b8;
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #0f172a;
  }

  span {
    margin-top: 5px;
    color: #64748b;
    line-height: 1.45;
  }
`;

const Empty = styled.p`
  margin: 0;
  color: #64748b;
  line-height: 1.6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthField = styled(Field)`
  grid-column: 1 / -1;
`;

const defaultForm = {
  id: null,
  subArea: '',
  zone: '',
  area: '',
  pdnum: '',
  pdName: '',
  code: '',
  storageType: 'MANUAL',
  unit: 'PCS',
  storageNum: '0',
  operator: 'admin-ui',
  lastModify: '',
  extype: '',
  stockChange: '',
};

function createFormFromRecord(record) {
  if (!record) return defaultForm;
  return {
    id: record.id,
    subArea: record.subArea || '',
    zone: record.zone || '',
    area: record.area || '',
    pdnum: record.pdnum || '',
    pdName: record.pdName || '',
    code: record.code || '',
    storageType: record.storageType || 'MANUAL',
    unit: record.unit || 'PCS',
    storageNum: String(record.storageNum ?? 0),
    operator: record.operator || 'admin-ui',
    lastModify: record.lastModify || '',
    extype: record.extype || '',
    stockChange: record.stockChange || '',
  };
}

function formatSubAreaOptions(meta) {
  const zones = meta?.availableZones || [];
  const count = meta?.availableSubAreas || 0;
  return { zones, count };
}

function buildSubAreaOptions(meta) {
  const zones = meta?.availableZones || [];
  const options = [];

  zones.forEach(zone => {
    if (zone === 'BC') {
      const bMax = 7;
      const cMax = 9;
      for (let index = 0; index <= bMax; index += 1) {
        options.push(`B${index}`);
      }
      for (let index = 0; index <= cMax; index += 1) {
        options.push(`C${index}`);
      }
      return;
    }

    const maxByZone = {
      A: 7,
      D: 9,
      E: 9,
      F: 9,
      G: 9,
      H: 1,
      I: 9,
      J: 5,
    };

    const max = maxByZone[zone];
    if (typeof max !== 'number') return;
    for (let index = 0; index <= max; index += 1) {
      options.push(`${zone}${index}`);
    }
  });

  return options;
}

function filterSubAreasByZone(subAreas, zone) {
  if (!zone) return subAreas;
  if (zone === 'BC') {
    return subAreas.filter(subArea => subArea.startsWith('B') || subArea.startsWith('C'));
  }
  return subAreas.filter(subArea => subArea.startsWith(zone));
}

const StorageAdminPage = () => {
  const [records, setRecords] = useState([]);
  const [meta, setMeta] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [filters, setFilters] = useState({ zone: '', subArea: '', query: '' });
  const deferredQuery = useDeferredValue(filters.query);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pdnumLoading, setPdnumLoading] = useState(false);

  const selectedRecord = useMemo(
    () => records.find(record => record.id === selectedRecordId) || null,
    [records, selectedRecordId]
  );

  const availableZones = formatSubAreaOptions(meta).zones;
  const availableSubAreas = useMemo(() => buildSubAreaOptions(meta), [meta]);
  const filterSubAreaOptions = useMemo(
    () => filterSubAreasByZone(availableSubAreas, filters.zone),
    [availableSubAreas, filters.zone]
  );
  const formSubAreaOptions = useMemo(() => {
    const linkedZone = filters.zone || form.zone;
    const options = filterSubAreasByZone(availableSubAreas, linkedZone);
    if (form.subArea && !options.includes(form.subArea)) {
      return [form.subArea, ...options];
    }
    return options;
  }, [availableSubAreas, filters.zone, form.zone, form.subArea]);

  async function loadRecords(activeFilters = filters) {
    setLoading(true);
    setError('');
    try {
      const [recordPayload, metaPayload] = await Promise.all([
        apiClient.listStorageRecords({
          zone: activeFilters.zone,
          subArea: activeFilters.subArea,
          query: activeFilters.query,
        }),
        apiClient.getStorageMeta(),
      ]);
      setRecords(recordPayload.records || []);
      setMeta(metaPayload);
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords(filters);
  }, []);

  useEffect(() => {
    const nextFilters = { ...filters, query: deferredQuery };
    loadRecords(nextFilters);
  }, [filters.zone, filters.subArea, deferredQuery]);

  useEffect(() => {
    if (!selectedRecord) return;
    setForm(createFormFromRecord(selectedRecord));
  }, [selectedRecord]);

  useEffect(() => {
    async function generatePdnum() {
      if (form.id) return;
      if (!form.subArea || !form.storageType) {
        setForm(current => ({ ...current, pdnum: '' }));
        return;
      }

      setPdnumLoading(true);
      try {
        const payload = await apiClient.listStorageRecords({ subArea: form.subArea });
        const nextIndex = (payload.records?.length ?? 0) + 1;
        const nextPdnum = `${form.subArea}-${form.storageType.toUpperCase()}-${String(nextIndex).padStart(3, '0')}`;
        setForm(current => {
          if (current.id) return current;
          if (current.subArea !== form.subArea || current.storageType !== form.storageType) return current;
          return { ...current, pdnum: nextPdnum };
        });
      } catch {
        setForm(current => {
          if (current.id) return current;
          const fallbackPdnum = `${form.subArea}-${form.storageType.toUpperCase()}-001`;
          return { ...current, pdnum: fallbackPdnum };
        });
      } finally {
        setPdnumLoading(false);
      }
    }

    generatePdnum();
  }, [form.id, form.subArea, form.storageType]);

  function handleFilterChange(key, value) {
    setFilters(current => ({
      ...current,
      [key]: value,
      ...(key === 'zone' && value ? { subArea: '' } : {}),
    }));
  }

  function handleFormChange(key, value) {
    setForm(current => {
      const next = { ...current, [key]: value };
      if (key === 'subArea') {
        next.zone = value.slice(0, 1).toUpperCase();
        next.area = value.slice(1).toUpperCase();
      }
      if (key === 'zone' || key === 'area') {
        next.subArea = `${key === 'zone' ? value : current.zone}${key === 'area' ? value : current.area}`.toUpperCase();
      }
      return next;
    });
  }

  function handleSelectRecord(record) {
    setSelectedRecordId(record.id);
    setForm(createFormFromRecord(record));
    setMessage('');
    setError('');
  }

  function handleCreateNew() {
    setSelectedRecordId(null);
    setForm(defaultForm);
    setMessage('');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const payload = {
        ...form,
        storageNum: Number(form.storageNum || 0),
        subArea: form.subArea.toUpperCase(),
      };
      if (form.id) {
        await apiClient.updateStorageRecord(form.id, payload);
        setMessage('儲位資料已更新。');
      } else {
        await apiClient.createStorageRecord(payload);
        setMessage('已新增新的儲位資料。');
      }
      await loadRecords(filters);
      if (!form.id) {
        setForm(defaultForm);
      }
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    setDeleting(true);
    setMessage('');
    setError('');
    try {
      await apiClient.deleteStorageRecord(form.id);
      setMessage('儲位資料已刪除。');
      setSelectedRecordId(null);
      setForm(defaultForm);
      await loadRecords(filters);
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <h2>Storage Admin</h2>
          <p>直接維護 SQLite 內的儲位資料，變更後會同步回手動 JSON 與 cache。</p>
        </CardHeader>
        <CardBody>
          <StatStrip>
            <Stat>
              <strong>{meta?.database?.totalRecords ?? records.length}</strong>
              <span>目前資料筆數</span>
            </Stat>
            <Stat>
              <strong>{meta?.manual?.recordCount ?? 0}</strong>
              <span>手動資料檔筆數</span>
            </Stat>
            <Stat>
              <strong>{meta?.cache?.generatedAt ? 'Ready' : 'Pending'}</strong>
              <span>快取狀態</span>
            </Stat>
          </StatStrip>

          <FilterGrid>
            <Field>
              區域篩選
              <Select value={filters.zone} onChange={event => handleFilterChange('zone', event.target.value)}>
                <option value="">全部區域</option>
                {availableZones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </Select>
            </Field>
            <Field>
              子區塊
              <Select
                value={filters.subArea}
                onChange={event => handleFilterChange('subArea', event.target.value)}
              >
                <option value="">全部子區塊</option>
                {filterSubAreaOptions.map(subArea => (
                  <option key={subArea} value={subArea}>{subArea}</option>
                ))}
              </Select>
            </Field>
          </FilterGrid>

          <Field>
            關鍵字搜尋
            <Input
              value={filters.query}
              onChange={event => handleFilterChange('query', event.target.value)}
              placeholder="搜尋品號、品名、儲位代碼"
            />
          </Field>

          <ButtonRow>
            <Button type="button" onClick={() => loadRecords(filters)} disabled={loading}>重新載入</Button>
            <Button type="button" $secondary onClick={handleCreateNew}>新增資料</Button>
          </ButtonRow>

          {error && <Notice $error>{error}</Notice>}
          {message && <Notice>{message}</Notice>}

          <RecordList>
            {loading ? (
              <Empty>讀取資料中...</Empty>
            ) : records.length === 0 ? (
              <Empty>目前沒有符合條件的資料。</Empty>
            ) : (
              records.map(record => (
                <RecordCard
                  key={record.id}
                  type="button"
                  $active={record.id === selectedRecordId}
                  onClick={() => handleSelectRecord(record)}
                >
                  <strong>{record.pdnum} / {record.pdName}</strong>
                  <span>{record.subArea} {record.code ? `/ ${record.code}` : ''}</span>
                  <span>庫存 {record.storageNum} {record.unit || ''}</span>
                </RecordCard>
              ))
            )}
          </RecordList>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3>{form.id ? 'Edit Record' : 'Create Record'}</h3>
          <p>欄位送出後會更新 SQLite，並同步回 `storage-manual.json` 與 cache。</p>
        </CardHeader>
        <CardBody as="form" onSubmit={handleSubmit}>
          <FormGrid>
            <Field>
              子區塊
              <Select
                value={form.subArea}
                onChange={event => handleFormChange('subArea', event.target.value.toUpperCase())}
                required
              >
                <option value="">選擇子區塊</option>
                {formSubAreaOptions.map(subArea => (
                  <option key={subArea} value={subArea}>{subArea}</option>
                ))}
              </Select>
            </Field>
            <Field>
              品號
              <Input
                value={form.pdnum}
                disabled
                readOnly
                placeholder={pdnumLoading ? '自動產生中...' : '會自動產生'}
                required
              />
            </Field>
            <Field>
              區域
              <Input value={form.zone} disabled readOnly required />
            </Field>
            <Field>
              子區數字
              <Input value={form.area} disabled readOnly required />
            </Field>
            <FullWidthField>
              品名
              <Input
                value={form.pdName}
                onChange={event => handleFormChange('pdName', event.target.value)}
                placeholder="鋁框支架組"
                required
              />
            </FullWidthField>
            <Field>
              儲位代碼
              <Input value={form.code} onChange={event => handleFormChange('code', event.target.value)} />
            </Field>
            <Field>
              儲位型態
              <Input value={form.storageType} onChange={event => handleFormChange('storageType', event.target.value)} />
            </Field>
            <Field>
              單位
              <Input value={form.unit} onChange={event => handleFormChange('unit', event.target.value)} />
            </Field>
            <Field>
              庫存數量
              <Input type="number" step="0.01" value={form.storageNum} onChange={event => handleFormChange('storageNum', event.target.value)} />
            </Field>
            <Field>
              操作者
              <Input value={form.operator} onChange={event => handleFormChange('operator', event.target.value)} />
            </Field>
            <Field>
              最後修改
              <Input
                value={form.lastModify}
                disabled
                readOnly
                placeholder={form.id ? '儲存後由系統更新' : '建立後由系統填入'}
              />
            </Field>
            <Field>
              類型備註
              <Input value={form.extype} onChange={event => handleFormChange('extype', event.target.value)} />
            </Field>
            <FullWidthField>
              異動備註
              <Input value={form.stockChange} onChange={event => handleFormChange('stockChange', event.target.value)} />
            </FullWidthField>
          </FormGrid>

          <ButtonRow>
            <Button type="submit" disabled={saving}>{saving ? '儲存中...' : form.id ? '更新資料' : '新增資料'}</Button>
            <Button type="button" $secondary onClick={handleCreateNew}>清空表單</Button>
            {form.id && (
              <Button type="button" $danger onClick={handleDelete} disabled={deleting}>
                {deleting ? '刪除中...' : '刪除資料'}
              </Button>
            )}
          </ButtonRow>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default StorageAdminPage;
