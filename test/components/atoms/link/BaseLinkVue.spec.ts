import { mount } from "@vue/test-utils";
import BaseLinkModel from "~/components/atoms/link/BaseLinkModel";
import BaseLink from "~/components/atoms/link/BaseLink.vue";

describe('Testing BaseLink.vue component', () => {

  test('standard', () => {
    const link: BaseLinkModel = new BaseLinkModel('content')
    const component = mount(BaseLink, {
      propsData: {
        baseLinkModel: link
      }
    })

    expect(component.find('a').text()).toBe('content')
    expect(component.find('a').classes()).toEqual(['light', 'no-underline'])
    expect(component.find('a').attributes().href).toEqual('/')
    expect(component.find('a').attributes().target).toEqual('_self')
  })

  test('external link', () => {
    const link: BaseLinkModel = new BaseLinkModel('content', 'https://google.com')
    const component = mount(BaseLink, {
      propsData: {
        baseLinkModel: link
      }
    })

    expect(component.find('a').attributes().target).toEqual('_blank')
  })

  test('customize style', () => {
    const link: BaseLinkModel = new BaseLinkModel('content')
    link.setStyleOrThrowError('danger', true)
    const component = mount(BaseLink, {
      propsData: {
        baseLinkModel: link
      }
    })

    expect(component.find('a').classes()).toEqual(['danger'])
  })


})
