import { mount } from "@vue/test-utils";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";

describe('Testing BaseButton.vue component', () => {

  test('standard', () => {
    const button: BaseButtonModel = new BaseButtonModel('content')
    const component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').text()).toBe('content')
    expect(component.find('button').classes()).toContain('btn-primary')
  })

  test('with an icon', () => {
    const button: BaseButtonModel = new BaseButtonModel('content')
    button.setIcon('icon')
    const component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').text()).toBe('content')
    expect(component.find('button').find('i').classes()).toContain('icon')
  })

  test('only icon', () => {
    const button: BaseButtonModel = new BaseButtonModel('content')
    button.setIcon('icon', true)
    const component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').classes()).toContain('btn-icon')
    expect(component.find('button').find('i').classes()).toContain('icon')
  })

  test('is outlined', () => {
    const button: BaseButtonModel = new BaseButtonModel('content')
    button.setStyleOrThrowError('primary', true)
    const component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').classes().includes('btn-outline')).toBeTruthy()
  })

  test('is round', () => {
    const button: BaseButtonModel = new BaseButtonModel('content')
    button.setStyleOrThrowError('primary', false, true)
    const component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').classes()).toContain('btn-round')
  })

  test('customize type', () => {
    const button: BaseButtonModel = new BaseButtonModel('content')
    let component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').attributes().type).toEqual('submit')

    button.setTypeOrThrowError('reset')
    component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').attributes().type).toEqual('reset')

  })

  test('is loading', () => {
    const button: BaseButtonModel = new BaseButtonModel('content')
    button.setIcon('icon')
    let component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').find('i').classes()).toContain('icon')

    button.setLoading(true)
    component = mount(BaseButton, {
      propsData: {
        baseButtonModel: button
      }
    })

    expect(component.find('button').find('i').classes()).toEqual(['fa', 'fa-spinner', 'fa-spin'])
    expect(component.find('button').attributes().disabled).toBeTruthy()
  })
})
