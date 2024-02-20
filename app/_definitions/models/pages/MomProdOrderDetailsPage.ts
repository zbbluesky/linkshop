import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormRockConfig } from '@ruiapp/rapid-extension';

const taskFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'material',
    },
    {
      type: 'auto',
      code: 'materialFlow',
      formControlProps: {
        listTextFieldName: "version",
      }
    },
    {
      type: 'auto',
      code: 'materialProcess',
      listDataFindOptions: {
        properties: ["id", "process", "aliasName"],
      },
      formControlProps: {
        listTextFormat: '{{process.code}} {{process.name}} ({{aliasName}})',
      },
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
      code: 'equipment',
      formControlProps: {
        listTextFormat: '{{code}} {{name}}',
      },
    },
    {
      type: 'auto',
      code: 'assignees',
      listDataFindOptions: {
        fixedFilters: [
          {
            field: "state",
            operator: "eq",
            value: "normal",
          }
        ]
      }
    },
    {
      type: 'auto',
      code: 'deadline',
    },
    {
      type: 'auto',
      code: 'assigner',
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
};

const page: RapidPage = {
  code: 'mom_prod_order_details',
  name: '工单详情',
  title: '工单详情',
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'ProductionOrder',
      mode: 'view',
      column: 3,
      items: [
        {
          type: 'auto',
          code: 'code',
        },
        {
          type: 'auto',
          code: 'productionPlan',
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}}",
            url: "/pages/mom_prod_plan_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'material',
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/base_material_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'amount',
        },
        {
          type: 'auto',
          code: 'unit',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'assignmentState',
        },
        {
          type: 'auto',
          code: 'executionState',
        },
        {
          type: 'auto',
          code: 'createdAt',
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      }
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "tasks",
          label: "工序任务",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "ProductionTask",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "work_order_id",
                  operator: "eq",
                  value: "",
                }
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                }
              ],
              columns: [
                {
                  type: 'link',
                  code: 'code',
                  width: '100px',
                  fixed: 'left',
                  rendererType: "link",
                  rendererProps: {
                    url: "/pages/mom_prod_task_details?id={{id}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'materialProcess',
                  width: '150px',
                  fixed: 'left',
                  rendererProps: {
                    format: "{{aliasName}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'amount',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'unit',
                  width: '150px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'equipment',
                  width: '150px',
                  rendererProps: {
                    format: "{{code}} {{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'assignees',
                  width: '150px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'deadline',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'assigner',
                  width: '150px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'assignedAt',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'acceptedAt',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'assignmentState',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'executionState',
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
                  entityCode: "ProductionTask",
                },
              ],
              newForm: cloneDeep(taskFormConfig),
              editForm: cloneDeep(taskFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.work_order_id": "$rui.parseQuery().id",
              },
            }
          ]
        },
      ]
    }
  ],
};

export default page;