#ifdef RCT_NEW_ARCH_ENABLED
#import "QaMenuView.h"

#import <react/renderer/components/RNQaMenuViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNQaMenuViewSpec/EventEmitters.h>
#import <react/renderer/components/RNQaMenuViewSpec/Props.h>
#import <react/renderer/components/RNQaMenuViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface QaMenuView () <RCTQaMenuViewViewProtocol>

@end

@implementation QaMenuView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<QaMenuViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const QaMenuViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<QaMenuViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<QaMenuViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> QaMenuViewCls(void)
{
    return QaMenuView.class;
}

@end
#endif
