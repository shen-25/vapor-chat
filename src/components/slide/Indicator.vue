<script lang="jsx">
import bus from "@/utils/bus";
import { getCss, setCss } from "@/utils/css";

export default {
  name: "Indicator",
  props: {
    activeIndex: {
      type: Number,
      default: () => 0,
    },
    tabStyleWidth: {
      type: String,
      default: () => "",
    },
    tabTexts: {
      type: Array,
      default: () => [],
    },
    tabRender: {
      type: Function,
      default: null,
    },
    //用于和slidList绑定，因为一个页面可能有多个slidList，但只有一个indicator组件
    name: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      currentSlideItemIndex: this.activeIndex,
      tabIndicatorRelationActiveIndexLefts: [], //指标和slideItem的index的对应left,
      indicatorSpace: 0, //indicator之间的间距
    };
  },
  computed: {},
  render() {
    /*
    *   <div class="tabs" ref="tabs">
            <div class="tab"
            style="{width : tabStyleWidth}"
            v-for="(item,index) in tabTexts"
            :class="currentSlideItemIndex === index?'active':''"
            @click="changeIndex(index)">
            <span>{{ item }}</span></div>
        </div>
    * */
    return (
      <div className="indicator-ctn">
        {this.tabRender ? (
          this.tabRender()
        ) : (
          <div className="tabs" ref="tabs">
            {this.tabTexts.map((item, index) => {
              return (
                <div
                  className={
                    this.currentSlideItemIndex === index ? "active tab" : "tab"
                  }
                  style={{
                    width:
                      this.tabStyleWidth || 100 / this.tabTexts.length + "%",
                  }}
                  onClick={(e) => this.changeIndex(index)}
                >
                  <span> {item}</span>
                </div>
              );
            })}
          </div>
        )}
        <div
          className="indicator"
          ref="indicator"
          style={{
            width: this.tabStyleWidth || 100 / this.tabTexts.length + "%",
          }}
        />
      </div>
    );
  },
  mounted() {
    this.initTabs();
    bus.on(this.name + "-moved", this.move);
    bus.on(this.name + "-end", this.end);
  },
  methods: {
    changeIndex(index) {
      this.currentSlideItemIndex = index;
      this.$attrs["onUpdate:activeIndex"] &&
        this.$emit("update:active-index", this.currentSlideItemIndex);
      setCss(this.indicatorRef, "transition-duration", `300ms`);
      setCss(
        this.indicatorRef,
        "left",
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] +
          "px"
      );
    },
    initTabs() {
      let tabs = this.$refs.tabs;
      this.indicatorRef = this.$refs.indicator;
      for (let i = 0; i < tabs.children.length; i++) {
        let item = tabs.children[i];
        this.tabWidth = getCss(item, "width");
        this.tabIndicatorRelationActiveIndexLefts.push(
          item.getBoundingClientRect().x -
            tabs.children[0].getBoundingClientRect().x +
            (this.indicatorType === "home" ? this.tabWidth * 0.15 : 0)
        );
      }
      this.indicatorSpace =
        this.tabIndicatorRelationActiveIndexLefts[1] -
        this.tabIndicatorRelationActiveIndexLefts[0];
      setCss(this.indicatorRef, "transition-duration", `0ms`);
      setCss(
        this.indicatorRef,
        "left",
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] +
          "px"
      );
    },
    move(e) {
      setCss(
        this.indicatorRef,
        "left",
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] -
          e.x.distance / (this.$store.state.bodyWidth / this.indicatorSpace) +
          "px"
      );
    },
    end(index) {
      // console.log(index)
      this.currentSlideItemIndex = index;
      setCss(this.indicatorRef, "transition-duration", `300ms`);
      setCss(
        this.indicatorRef,
        "left",
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] +
          "px"
      );
      setTimeout(() => {
        setCss(this.indicatorRef, "transition-duration", `0ms`);
      }, 300);
    },
  },
};
</script>

<style scoped lang="scss">
.indicator-ctn {
  font-size: 14rem;
  width: 100%;
  height: 43rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .tabs {
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    .tab {
      height: 40rem;
      width: 45%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: gray;
      transition: color 0.3s;
      font-size: 16rem;

      &.active {
        color: #000;
      }

      img {
        margin-left: 5rem;
        width: 12rem;

        height: 12rem;
      }
    }
  }

  .indicator {
    height: 2px;
    background: #000;
    width: 45%;
    position: relative;
    transition: all 0.3s;
  }
}
</style>
