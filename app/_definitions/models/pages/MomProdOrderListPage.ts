import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'productionPlan',
      formControlProps: {
        listTextFieldName: "code",
      }
    },
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'material',
      listDataFindOptions: {
        fixedFilters: [
          {
            operator: 'eq',
            field: 'can_produce',
            value: true,
          }
        ]
      },
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      }
    },
    {
      type: 'auto',
      code: 'materialFlow',
      formControlProps: {
        listTextFieldName: "version",
      },
    },
    {
      type: 'auto',
      code: 'scheduledStartDate',
    },
    {
      type: 'auto',
      code: 'scheduledFinishDate',
    },
    {
      type: 'auto',
      code: 'amount',
    },
    {
      type: 'auto',
      code: 'unit',
    },
    {
      type: 'auto',
      code: 'assignmentState',
    },
    {
      type: 'auto',
      code: 'executionState',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_prod_order_list',
  name: '工单列表',
  title: '工单管理',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "ProductionOrder",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        }
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code"],
        }
      ],
      columns: [
        {
          type: 'link',
          code: 'code',
          width: '150px',
          fixed: 'left',
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_prod_order_details?id={{id}}",
          },
        },
        {
          type: 'link',
          code: 'material',
          fixed: 'left',
          rendererType: "link",
          rendererProps: {
            text: "{{material.code}} {{material.name}}",
            url: "/pages/base_material_details?id={{material.id}}",
          },
        },
        {
          type: 'auto',
          code: 'materialFlow',
          width: '100px',
          rendererProps: {
            format: "{{version}}",
          },
        },
        {
          type: 'auto',
          code: 'scheduledStartDate',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'scheduledFinishDate',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'amount',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'unit',
          width: '100px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'assignmentState',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'executionState',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'createdAt',
          width: '150px',
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: 'edit',
          actionType: "edit",
          actionText: '修改',
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: 'delete',
          actionType: 'delete',
          actionText: '删除',
          dataSourceCode: "list",
          entityCode: "ProductionOrder",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: 'OcUser',
        items: [
          {
            type: 'auto',
            code: 'code',
            filterMode: 'contains',
          },
        ],
      },
    },
  ],
};

export default page;