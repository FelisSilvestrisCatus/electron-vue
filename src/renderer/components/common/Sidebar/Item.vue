<script>
    export default {
        name: 'MenuItem',
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        render(h, context) {
            const {icon, title} = context.props;
            const vnodes = [];

            if (icon) {
                let node = h('svg-icon', {
                        attrs: {
                            'icon-class': icon,
                        }
                    }
                );
                vnodes.push(node);
            }

            if (title) {
                let node = h('span', {
                        attrs: {
                            slot: title,
                        }
                    }, [title]
                );
                vnodes.push(node);
            }
            return vnodes
        }
    }
</script>
