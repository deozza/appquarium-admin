import { mount } from "@vue/test-utils";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";

describe('Testing BaseHeader.vue component', () => {

  test('standard', () => {
    const header: BaseHeaderModel = new BaseHeaderModel('content')
    const component = mount(BaseHeader, {
      propsData: {
        baseHeaderModel: header
      }
    })

    expect(component.find('h1').text()).toBe('content')
    expect(component.find('h1').classes()).toEqual(['light'])
  })

  test('customize size', () => {
    const header: BaseHeaderModel = new BaseHeaderModel('content')
    header.setSizeOrThrowError(2)
    const component = mount(BaseHeader, {
      propsData: {
        baseHeaderModel: header
      }
    })

    expect(component.find('h2').text()).toBe('content')
  })

  test('customize style', () => {
    const header: BaseHeaderModel = new BaseHeaderModel('content')
    header.setStyleOrThrowError('danger')
    const component = mount(BaseHeader, {
      propsData: {
        baseHeaderModel: header
      }
    })

    expect(component.find('h1').classes()).toEqual(['danger'])
  })
})
