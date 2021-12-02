import BaseBadgeModel from "~/components/atoms/badge/BaseBadgeModel";
import { mount } from "@vue/test-utils";
import BaseBadge from "~/components/atoms/badge/BaseBadge.vue";

describe('Testing BaseBadge.vue component', () => {

  test('standard', () => {
    const badge: BaseBadgeModel = new BaseBadgeModel('content')
    const component = mount(BaseBadge, {
      propsData: {
        baseBadgeModel: badge
      }
    })

    expect(component.find('span').text()).toBe('content')
    expect(component.find('span').classes()).toContain('badge-primary')
  })

  test('with an icon', () => {
    const badge: BaseBadgeModel = new BaseBadgeModel('content')
    const component = mount(BaseBadge, {
      propsData: {
        baseBadgeModel: badge
      }
    })

    expect(component.find('span').text()).toBe('content')
    expect(component.find('span').classes()).toContain('badge-primary')
  })

  test('only icon', () => {
    const badge: BaseBadgeModel = new BaseBadgeModel('')
    badge.setIcon('icon', true)
    const component = mount(BaseBadge, {
      propsData: {
        baseBadgeModel: badge
      }
    })

    expect(component.find('span').classes()).toContain('badge-icon')
    expect(component.find('span').find('i').classes()).toContain('icon')
  })

})
