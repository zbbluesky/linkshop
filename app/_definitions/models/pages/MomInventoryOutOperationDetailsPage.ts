import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const materialFormItemConfig: RapidEntityFormConfig["items"][0] = {
  type: "auto",
  label: "物品",
  code: "material",
  formControlType: "tableSingleSelector",
  formControlProps: {
    labelFormat: "{{material.code}} {{material.name}}（{{material.specification}}）",
    valueKey: "material.id",
    columns: [
      {
        title: "物品",
        code: "material",
        format: "{{material.code}} {{material.name}}（{{material.specification}}）",
        width: 260,
      },
      {
        title: "批次号",
        code: "lotNum",
        width: 120,
      },
    ],
    requestConfig: {
      url: `/mom/mom_inventory_application_items/operations/find`,
      params: {
        fixedFilters: [
          {
            field: "application",
            operator: "exists",
            filters: [
              {
                field: "id",
                operator: "eq",
                value: "",
              },
            ],
          },
        ],
        properties: ["id", "material", "lotNum", "unit"],
      },
    },
    onSelectedRecord: [
      {
        $action: "script",
        script: `
        const info = event.args[0] || {};
        if(info) {
          const _ = event.framework.getExpressionVars()._;
          event.page.sendComponentMessage(event.sender.$id.replace('-item-material-input', ''), {
            name: "setFieldsValue",
            payload: {
              unit: _.get(info, 'unit.name'),
              lotNum: _.get(info, 'lotNum')
            }
          });
        }
      `,
      },
    ],
  },
  $exps: {
    "formControlProps.requestConfig.params.fixedFilters[0].filters[0].value": "_.get(_.first(_.get($stores.detail, 'data.list')), 'application.id')",
  },
};

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    materialFormItemConfig,
    {
      type: "auto",
      code: "unit",
      formControlProps: {
        disabled: true,
      },
    },
    {
      type: "auto",
      code: "lotNum",
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "packageNum",
    },
  ],
};

const page: RapidPage = {
  code: "mom_inventory_out_operation_details",
  name: "出库操作详情",
  title: "出库操作详情",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "MomInventoryOperation",
      mode: "view",
      column: 3,
      extraProperties: ["application"],
      items: [
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "operationType",
        },
        {
          type: "auto",
          code: "businessType",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "createdAt",
        },
        {
          type: "auto",
          code: "state",
        },
        {
          type: "auto",
          code: "contractNum",
        },
        {
          type: "auto",
          code: "supplier",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "approvalState",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
    {
      $type: "box",
      children: [
        {
          $type: "sectionSeparator",
          showLine: true,
        },
        {
          $type: "htmlElement",
          htmlTag: "h2",
          children: [
            {
              $type: "text",
              text: "申请明细",
            },
          ],
        },
        {
          $id: "applicationItemList",
          $type: "sonicEntityList",
          entityCode: "MomInventoryApplicationItem",
          viewMode: "table",
          selectionMode: "none",
          fixedFilters: [
            {
              field: "application",
              operator: "exists",
              filters: [
                {
                  field: "id",
                  operator: "eq",
                  value: "",
                },
              ],
            },
          ],
          pageSize: -1,
          orderBy: [
            {
              field: "orderNum",
            },
          ],
          columns: [
            {
              type: "auto",
              code: "material",
              rendererType: "anchor",
              rendererProps: {
                children: {
                  $type: "materialLabelRenderer",
                  $exps: {
                    value: "$slot.value",
                  },
                },
                $exps: {
                  href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
                },
              },
            },
            {
              type: "auto",
              code: "lotNum",
              width: "100px",
            },
            {
              type: "auto",
              code: "quantity",
              width: "100px",
            },
            {
              type: "auto",
              code: "unit",
              width: "80px",
              rendererProps: {
                format: "{{name}}",
              },
            },
          ],
          $exps: {
            "fixedFilters[0].filters[0].value": "_.get(_.first(_.get($stores.detail, 'data.list')), 'application.id')",
          },
        },
      ],
      $exps: {
        _hidden: "!_.get(_.first(_.get($stores.detail, 'data.list')), 'application.id')",
      },
    },
    {
      $type: "sectionSeparator",
      showLine: false,
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "items",
          label: "库存操作明细",
          children: [
            {
              $id: "goodTransferList",
              $type: "sonicEntityList",
              entityCode: "MomGoodTransfer",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "operation",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: "",
                    },
                  ],
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              pageSize: -1,
              orderBy: [
                {
                  field: "createdAt",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "material",
                  rendererType: "anchor",
                  rendererProps: {
                    children: {
                      $type: "materialLabelRenderer",
                      $exps: {
                        value: "$slot.value",
                      },
                    },
                    $exps: {
                      href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
                    },
                  },
                },
                {
                  type: "auto",
                  code: "lotNum",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "binNum",
                  width: "100px",
                  title: "托盘号",
                },
                {
                  type: "auto",
                  code: "quantity",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "80px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "material",
                  title: "保质期",
                  rendererProps: {
                    format: "{{qualityGuaranteePeriod}}",
                  },
                },
                {
                  type: "auto",
                  code: "good",
                  title: "生产日期",
                  fieldName: "good.manufactureDate",
                  fieldType: "date",
                },
                {
                  type: "auto",
                  code: "good",
                  title: "有效期至",
                  fieldName: "good.validityDate",
                  fieldType: "date",
                },
                {
                  type: "auto",
                  code: "to",
                  width: "150px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: "edit",
                  actionType: "edit",
                  actionText: "修改",
                  $exps: {
                    _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'state') !== 'processing'",
                  },
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: "delete",
                  actionType: "delete",
                  actionText: "删除",
                  dataSourceCode: "list",
                  entityCode: "MomGoodTransfer",
                  $exps: {
                    _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'state') !== 'processing'",
                  },
                },
              ],
              editForm: cloneDeep(formConfig),
              stores: [
                {
                  type: "entityStore",
                  name: "locations",
                  entityCode: "BaseLocation",
                  properties: ["id", "type", "code", "name", "parent", "orderNum", "createdAt"],
                  filters: [],
                  orderBy: [
                    {
                      field: "orderNum",
                    },
                  ],
                },
              ],
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.operation_id": "$rui.parseQuery().id",
                "newForm.fixedFields.operationId": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
    {
      $type: "sectionSeparator",
      showLine: false,
    },
    {
      $type: "rapidToolbar",
      items: [
        {
          $type: "rapidToolbarButton",
          text: "批准",
          actionStyle: "primary",
          size: "large",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: { approvalState: "approved" },
              $exps: {
                url: `"/api/mom/mom_inventory_operations/" + $rui.parseQuery().id`,
              },
            },
          ],
          $exps: {
            _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'approvalState') !== 'approving'",
          },
        },
        {
          $type: "rapidToolbarButton",
          text: "拒绝",
          danger: true,
          size: "large",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: { approvalState: "rejected" },
              $exps: {
                url: `"/api/mom/mom_inventory_operations/" + $rui.parseQuery().id`,
              },
            },
          ],
          $exps: {
            _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'approvalState') !== 'approving'",
          },
        },
      ],
    },
  ],
};

export default page;