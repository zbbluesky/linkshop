import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomGood',
  name: '物品',
  description: '用来追溯/跟踪一个或者多个物理上存在的物品或者虚拟物品。',
  fields: [
    {
      code: 'material',
      name: '物料',
      type: 'relation',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'materialCode',
      name: '物料号',
      type: 'text',
    },
    {
      code: 'lotNum',
      name: '批号',
      type: 'text',
    },
    {
      code: 'binNum',
      name: '箱号',
      type: 'text',
    },
    {
      code: 'serialNum',
      name: '序列号',
      type: 'text',
    },
    {
      code: 'quantity',
      name: '数量',
      type: 'double',
    },
    {
      code: 'unit',
      name: '单位',
      type: 'relation',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'location',
      name: '位置',
      type: 'relation',
      targetSingularCode: 'base_location',
      targetIdColumnName: 'location_id',
    },
    {
      code: 'putInTime',
      name: '放入时间',
      type: 'datetime',
    },
    {
      code: 'source',
      name: '来源',
      description: '用来记录本物品是由哪一个/一些物品分拆或者合并而成。来源的物料和本物品的物料一定是相同的。',
      type: 'relation',
      targetSingularCode: 'mom_good',
      targetIdColumnName: 'source_id',
    },
    {
      code: 'labels',
      name: '标签',
      type: 'relation[]',
      targetSingularCode: 'mom_good_label',
      selfIdColumnName: 'good_id',
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'MomGoodState',
      required: true,
    },
    {
      code: 'extra',
      name: '扩展信息',
      type: 'json',
    },
  ],
};

export default entity;