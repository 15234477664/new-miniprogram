// components/address-dialog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    cityDefault: {
      city: '广东省',
      id: 440000,
      isProvinceId: true,
    },
    cityItem: {
      city: '广东省',
      id: 440000,
      isProvinceId: true,
    },
    cityList: [
      {
        type: 'C',
        children: [
          {
            city: '潮州',
            id: 445100
          }
        ]
      },
      {
        type: 'D',
        children: [
          {
            city: '东莞',
            id: 441900
          }
        ]
      },
      {
        type: 'F',
        children: [
          {
            city: '佛山',
            id: 440600
          }
        ]
      },
      {
        type: 'G',
        children: [
          {
            city: '广州',
            id: 440100
          }
        ]
      },
      {
        type: 'H',
        children: [
          {
            city: '惠州',
            id: 441300
          },
          {
            city: '河源',
            id: 441600
          }
        ]
      },
      {
        type: 'J',
        children: [
          {
            city: '江门',
            id: 440700
          },
          {
            city: '揭阳',
            id: 445200
          }
        ]
      },
      {
        type: 'M',
        children: [
          {
            city: '茂名',
            id: 440900
          },
          {
            city: '梅州',
            id: 441400
          }
        ]
      },
      {
        type: 'Q',
        children: [
          {
            city: '清远',
            id: 441800
          }
        ]
      },
      {
        type: 'S',
        children: [
          {
            city: '汕头',
            id: 440500
          },
          {
            city: '韶关',
            id: 440200
          },
          {
            city: '汕尾',
            id: 441500
          },
          {
            city: '深圳',
            id: 440300
          }
        ]
      },
      {
        type: 'Y',
        children: [
          {
            city: '阳江',
            id: 441700
          },
          {
            city: '云浮',
            id: 445300
          }
        ]
      },
      {
        type: 'Z',
        children: [
          {
            city: '湛江',
            id: 440800
          },
          {
            city: '肇庆',
            id: 441200
          },
          {
            city: '中山',
            id: 442000
          },
          {
            city: '珠海',
            id: 440400
          }
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 选择城市
     */
    cityCheck: function (event) {
      this.setData({
        cityItem: event.currentTarget.dataset.item,
        cityId: event.currentTarget.dataset.item.id
      })
    },
    /**
     * 关闭
     */
    close: function () {
      this.triggerEvent('closeDialog')
    },

    /**
     * 确认
     */
    confirm: function (event) {
      this.triggerEvent('handleConfirm', { item: this.data.cityItem })
    }
  }
})
