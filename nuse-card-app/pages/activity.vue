<template>
  <CardShell>
    <div class="activity-page">

      <!-- ========================================
           HEADER
      ======================================== -->

      <section class="activity-header">

        <span class="section-label">
          ✦ OUR JOURNEY ✦
        </span>

        <h1>
          NUSE
          <span>Roadmap</span>
        </h1>

        <p>
          ทุกกิจกรรมคืออีกหนึ่งก้าว <br />
          ในการเรียนรู้ <br />
          และการเติบโตไปด้วยกันใน NUSE
        </p>

      </section>


      <!-- ========================================
           ROADMAP PREVIEW
      ======================================== -->

      <section class="roadmap-section">


        <!-- ========================================
             VIEWPORT
        ======================================== -->

        <div
          class="roadmap-viewport"
          @touchstart.passive="handleTouchStart"
          @touchend.passive="handleTouchEnd"
        >

          <div
            class="roadmap-world"
            :style="{
              transform: `translate3d(0, ${roadmapOffset}px, 0)`
            }"
          >

            <!-- ========================================
                 ROAD
            ======================================== -->

            <svg
              class="road-svg"
              viewBox="0 0 360 1050"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >

              <path
                class="road-shadow"
                d="
                  M 180 -30
                  C 90 70, 90 150, 180 250
                  C 270 350, 270 430, 180 525
                  C 90 620, 90 700, 180 795
                  C 270 890, 270 960, 205 1080
                "
              />

              <path
                class="road"
                d="
                  M 180 -30
                  C 90 70, 90 150, 180 250
                  C 270 350, 270 430, 180 525
                  C 90 620, 90 700, 180 795
                  C 270 890, 270 960, 205 1080
                "
              />

              <path
                class="road-center"
                d="
                  M 180 -30
                  C 90 70, 90 150, 180 250
                  C 270 350, 270 430, 180 525
                  C 90 620, 90 700, 180 795
                  C 270 890, 270 960, 205 1080
                "
              />

            </svg>


            <!-- ========================================
                 MILESTONE 01
            ======================================== -->

            <button
              class="milestone milestone-1"
              :class="[
                `status-${getActivityStatus(0)}`,
                {
                  selected: selectedIndex === 0
                }
              ]"
              type="button"
              @click="selectMilestone(0)"
            >

              <span class="milestone-info">

                <span class="milestone-label">
                  1st STATION
                </span>

                <strong>
                  Frame Of Opportunity
                </strong>

                <small>
                  10 AUG 2026
                </small>

                <em
                  v-if="getActivityStatus(0) === 'active'"
                  class="now"
                >
                  ✦ NOW
                </em>

                <em
                  v-else-if="getActivityStatus(0) === 'completed'"
                  class="completed"
                >
                  ✓ COMPLETED
                </em>

                <em
                  v-else
                  class="locked"
                >
                  🔒 LOCKED
                </em>

              </span>

              <span class="marker marker-navy">
                <span>01</span>
              </span>

            </button>


            <!-- ========================================
                 MILESTONE 02
            ======================================== -->

            <button
              class="milestone milestone-2"
              :class="[
                `status-${getActivityStatus(1)}`,
                {
                  selected: selectedIndex === 1
                }
              ]"
              type="button"
              @click="selectMilestone(1)"
            >

              <span class="marker marker-orange">
                <span>02</span>
              </span>

              <span class="milestone-info">

                <span class="milestone-label">
                  2nd STATION
                </span>

                <strong>
                  ???
                </strong>

                <small>
                  24 AUG 2026
                </small>

                <em
                  v-if="getActivityStatus(1) === 'active'"
                  class="now"
                >
                  ✦ NOW
                </em>

                <em
                  v-else-if="getActivityStatus(1) === 'completed'"
                  class="completed"
                >
                  ✓ COMPLETED
                </em>

                <em
                  v-else
                  class="locked"
                >
                  🔒 LOCKED
                </em>

              </span>

            </button>


            <!-- ========================================
                 MILESTONE 03
            ======================================== -->

            <button
              class="milestone milestone-3"
              :class="[
                `status-${getActivityStatus(2)}`,
                {
                  selected: selectedIndex === 2
                }
              ]"
              type="button"
              @click="selectMilestone(2)"
            >

              <span class="milestone-info">

                <span class="milestone-label">
                  3rd STATION
                </span>

                <strong>
                  ???
                </strong>

                <small>
                  07 SEP 2026
                </small>

                <em
                  v-if="getActivityStatus(2) === 'active'"
                  class="now"
                >
                  ✦ NOW
                </em>

                <em
                  v-else-if="getActivityStatus(2) === 'completed'"
                  class="completed"
                >
                  ✓ COMPLETED
                </em>

                <em
                  v-else
                  class="locked"
                >
                  🔒 LOCKED
                </em>

              </span>

              <span class="marker marker-blue">
                <span>03</span>
              </span>

            </button>


            <!-- ========================================
                 MILESTONE 04
            ======================================== -->

            <button
              class="milestone milestone-4"
              :class="[
                `status-${getActivityStatus(3)}`,
                {
                  selected: selectedIndex === 3
                }
              ]"
              type="button"
              @click="selectMilestone(3)"
            >

              <span class="marker marker-orange">
                <span>04</span>
              </span>

              <span class="milestone-info">

                <span class="milestone-label">
                  4th STATION
                </span>

                <strong>
                  ???
                </strong>

                <small>
                  14 SEP 2026
                </small>

                <em
                  v-if="getActivityStatus(3) === 'active'"
                  class="now"
                >
                  ✦ NOW
                </em>

                <em
                  v-else-if="getActivityStatus(3) === 'completed'"
                  class="completed"
                >
                  ✓ COMPLETED
                </em>

                <em
                  v-else
                  class="locked"
                >
                  🔒 LOCKED
                </em>

              </span>

            </button>


            <!-- ========================================
                 MILESTONE 05
            ======================================== -->

            <button
              class="milestone milestone-5"
              :class="[
                `status-${getActivityStatus(4)}`,
                {
                  selected: selectedIndex === 4
                }
              ]"
              type="button"
              @click="selectMilestone(4)"
            >

              <span class="milestone-info">

                <span class="milestone-label">
                  5th STATION
                </span>

                <strong>
                  ???
                </strong>

                <small>
                  21 SEP 2026
                </small>

                <em
                  v-if="getActivityStatus(4) === 'active'"
                  class="now"
                >
                  ✦ NOW
                </em>

                <em
                  v-else-if="getActivityStatus(4) === 'completed'"
                  class="completed"
                >
                  ✓ COMPLETED
                </em>

                <em
                  v-else
                  class="locked"
                >
                  🔒 LOCKED
                </em>

              </span>

              <span class="marker marker-navy">
                <span>05</span>
              </span>

            </button>


            <!-- ========================================
                 MILESTONE 06
            ======================================== -->

            <button
              class="milestone milestone-6"
              :class="[
                `status-${getActivityStatus(5)}`,
                {
                  selected: selectedIndex === 5
                }
              ]"
              type="button"
              @click="selectMilestone(5)"
            >

              <span class="marker marker-pink">
                <span>06</span>
              </span>

              <span class="milestone-info">

                <span class="milestone-label">
                  6th STATION
                </span>

                <strong>
                  ???
                </strong>

                <small>
                  28 SEP 2026
                </small>

                <em
                  v-if="getActivityStatus(5) === 'active'"
                  class="now"
                >
                  ✦ NOW
                </em>

                <em
                  v-else-if="getActivityStatus(5) === 'completed'"
                  class="completed"
                >
                  ✓ COMPLETED
                </em>

                <em
                  v-else
                  class="locked"
                >
                  🔒 LOCKED
                </em>

              </span>

            </button>
          </div>


          <!-- ========================================
               PREVIEW FADE
          ======================================== -->

          <div class="preview-fade preview-fade-top"></div>
          <div class="preview-fade preview-fade-bottom"></div>


          <!-- ========================================
               ARROWS
          ======================================== -->

          <button
            class="road-arrow road-arrow-up"
            type="button"
            :disabled="selectedIndex === 0"
            aria-label="Previous milestone"
            @click="previousMilestone"
          >
            ↑
          </button>

          <button
            class="road-arrow road-arrow-down"
            type="button"
            :disabled="selectedIndex === activities.length - 1"
            aria-label="Next milestone"
            @click="nextMilestone"
          >
            ↓
          </button>


        </div>

        <!-- ========================================
             VIEW FULL ONLY
        ======================================== -->

        <div class="view-full-area">

          <button
            type="button"
            class="view-full-button"
            @click="openFullMap"
          >
            VIEW FULL
            <span>↕</span>
          </button>

        </div>

      </section>


      <!-- ========================================
           LOGIN / REGISTER
      ======================================== -->

      <section class="auth-section">

        <div class="auth-decoration">
          ✦
        </div>

        <h2>
          Ready to join us?
        </h2>

        <p>
          มาเป็นส่วนหนึ่งของการเดินทางไปด้วยกัน
        </p>

        <div class="auth-buttons">

          <NuxtLink
            to="/login"
            class="auth-button primary"
          >
            Login
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="auth-button secondary"
          >
            Register
          </NuxtLink>

        </div>

      </section>


      <!-- ========================================
           FULL ROADMAP MODAL
      ======================================== -->

      <Transition name="modal">

        <div
          v-if="showModal"
          class="modal-backdrop"
          @click.self="closeFullMap"
        >

          <div class="full-roadmap-modal">

            <div class="full-map-header">
              <div>
                <span>OUR JOURNEY</span>
                <h2>NUSE Roadmap</h2>
              </div>

              <button
                type="button"
                class="modal-close"
                aria-label="Close full roadmap"
                @click="closeFullMap"
              >
                ×
              </button>
            </div>

            <div class="full-map-scroll">

              <div class="full-roadmap-world">

                <svg
                  class="road-svg full-road-svg"
                  viewBox="0 0 360 1050"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <path
                    class="road-shadow"
                    d="M 180 -30 C 90 70, 90 150, 180 250 C 270 350, 270 430, 180 525 C 90 620, 90 700, 180 795 C 270 890, 270 960, 205 1080"
                  />
                  <path
                    class="road"
                    d="M 180 -30 C 90 70, 90 150, 180 250 C 270 350, 270 430, 180 525 C 90 620, 90 700, 180 795 C 270 890, 270 960, 205 1080"
                  />
                  <path
                    class="road-center"
                    d="M 180 -30 C 90 70, 90 150, 180 250 C 270 350, 270 430, 180 525 C 90 620, 90 700, 180 795 C 270 890, 270 960, 205 1080"
                  />
                </svg>

                <button
                  v-for="(activity, index) in activities"
                  :key="`full-${activity.number}`"
                  type="button"
                  class="milestone full-map-milestone"
                  :class="`status-${getActivityStatus(index)}`"
                  :style="getFullMapMilestoneStyle(index)"
                  @click="selectFromFullMap(index)"
                >
                  <template v-if="index % 2 === 0">
                    <span class="marker" :class="`marker-${getMarkerClass(index)}`">
                      <span>{{ activity.number }}</span>
                    </span>
                  </template>

                  <span class="milestone-info">
                    <span class="milestone-label">
                      {{ `${index + 1}${getOrdinalSuffix(index + 1)} STATION` }}
                    </span>
                    <strong>{{ activity.title }}</strong>
                    <small>{{ formatDate(activity.date) }}</small>
                    <em v-if="getActivityStatus(index) === 'active'" class="now">✦ NOW</em>
                    <em v-else-if="getActivityStatus(index) === 'completed'" class="completed">✓ COMPLETED</em>
                    <em v-else class="locked">🔒 LOCKED</em>
                  </span>

                  <template v-if="index % 2 !== 0">
                    <span class="marker" :class="`marker-${getMarkerClass(index)}`">
                      <span>{{ activity.number }}</span>
                    </span>
                  </template>
                </button>

              </div>

            </div>

          </div>

        </div>

      </Transition>

    </div>
  </CardShell>
</template>


<script setup lang="ts">

import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'


/* ========================================
   MILESTONE DATA
======================================== */

const activities = [

  {
    number: '01',
    title: 'Frame Of Opportunity',
    date: '2026-08-10'
  },

  {
    number: '02',
    title: '???',
    date: '2026-08-24'
  },

  {
    number: '03',
    title: '???',
    date: '2026-09-07'
  },

  {
    number: '04',
    title: '???',
    date: '2026-09-14'
  },

  {
    number: '05',
    title: '???',
    date: '2026-09-21'
  },

  {
    number: '06',
    title: '???',
    date: '2026-09-28'
  }

]


/* ========================================
   CURRENT TIME
======================================== */

const now = ref(
  new Date()
)


let timer:
  ReturnType<typeof setInterval> |
  undefined


onMounted(() => {

  timer = setInterval(() => {

    now.value = new Date()

  }, 60 * 1000)

})


onUnmounted(() => {

  if (timer) {

    clearInterval(timer)

  }

})


/* ========================================
   MILESTONE STATUS
======================================== */

const getActivityStatus = (
  index: number
) => {

  const currentTime =
    now.value.getTime()


  const activityDate =
    new Date(
      `${activities[index].date}T00:00:00`
    ).getTime()


  /*
   * ยังไม่ถึงวัน
   */

  if (
    currentTime <
    activityDate
  ) {

    return 'locked'

  }


  /*
   * Milestone สุดท้าย
   */

  if (
    index ===
    activities.length - 1
  ) {

    return 'active'

  }


  /*
   * วันของ Milestone ถัดไป
   */

  const nextActivityDate =
    new Date(
      `${activities[index + 1].date}T00:00:00`
    ).getTime()


  /*
   * อยู่ในช่วง Milestone นี้
   */

  if (
    currentTime >= activityDate &&
    currentTime < nextActivityDate
  ) {

    return 'active'

  }


  /*
   * ผ่าน Milestone ไปแล้ว
   */

  return 'completed'

}


/* ========================================
   CURRENT MILESTONE
======================================== */

const currentIndex = computed(() => {

  const currentTime =
    now.value.getTime()


  let activeIndex = 0


  for (
    let i = 0;
    i < activities.length;
    i++
  ) {

    const activityTime =
      new Date(
        `${activities[i].date}T00:00:00`
      ).getTime()


    if (
      currentTime >= activityTime
    ) {

      activeIndex = i

    }

  }


  return activeIndex

})


/* ========================================
   SELECTED MILESTONE
======================================== */

const selectedIndex = ref(0)


/*
 * เปิดหน้าเว็บครั้งแรก
 * ให้ Preview อยู่ที่ Milestone ปัจจุบัน
 */

onMounted(() => {

  selectedIndex.value =
    currentIndex.value

})


/*
 * เมื่อวันเปลี่ยน
 * Preview จะเลื่อนไป Milestone ปัจจุบันเอง
 */

watch(
  currentIndex,
  (newIndex) => {

    selectedIndex.value =
      newIndex

  }
)


/* ========================================
   ROADMAP POSITION
======================================== */

/*
 * ตำแหน่งแต่ละ Milestone
 * ใช้คำนวณว่าต้องเลื่อน Roadmap ขึ้นเท่าไร
 */

const milestonePositions = [

  65,
  239,
  413,
  587,
  761,
  935

]


const roadmapOffset = computed(() => {

  const position =
    milestonePositions[selectedIndex.value]


  /*
   * จุดที่ต้องการให้ Milestone
   * ปรากฏอยู่ประมาณกลาง Preview
   */

  const targetPosition = 145


  return (
    targetPosition -
    position
  )

})


/* ========================================
   NAVIGATION
======================================== */

const selectMilestone = (
  index: number
) => {

  selectedIndex.value =
    Math.max(
      0,
      Math.min(
        activities.length - 1,
        index
      )
    )

}


const previousMilestone = () => {

  if (
    selectedIndex.value > 0
  ) {

    selectedIndex.value--

  }

}


const nextMilestone = () => {

  if (
    selectedIndex.value <
    activities.length - 1
  ) {

    selectedIndex.value++

  }

}


/* ========================================
   VERTICAL SWIPE
======================================== */

const touchStartY = ref<number | null>(null)


const handleTouchStart = (event: TouchEvent) => {

  touchStartY.value =
    event.changedTouches[0]?.clientY ?? null

}


const handleTouchEnd = (event: TouchEvent) => {

  if (touchStartY.value === null) {

    return

  }


  const endY =
    event.changedTouches[0]?.clientY


  if (endY === undefined) {

    touchStartY.value = null
    return

  }


  const distance =
    endY - touchStartY.value


  /*
   * ปัดขึ้น = ไป Milestone ถัดไป
   * ปัดลง = ย้อนกลับ Milestone ก่อนหน้า
   */

  if (Math.abs(distance) >= 45) {

    if (distance < 0) {

      nextMilestone()

    } else {

      previousMilestone()

    }

  }


  touchStartY.value = null

}


/* ========================================
   DATE FORMAT
======================================== */

const formatDate = (
  date: string
) => {

  const parsed =
    new Date(
      `${date}T00:00:00`
    )


  return parsed
    .toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    )
    .toUpperCase()

}


/* ========================================
   FULL ROADMAP MODAL
======================================== */

const showModal = ref(false)

const openFullMap = () => {
  showModal.value = true
}

const closeFullMap = () => {
  showModal.value = false
}

const selectFromFullMap = (index: number) => {
  selectedIndex.value = index
  closeFullMap()
}

const getFullMapMilestoneStyle = (index: number) => {
  const top = milestonePositions[index]

  return index % 2 === 0
    ? { top: `${top}px`, left: '5%' }
    : { top: `${top}px`, right: '4%' }
}

const getOrdinalSuffix = (number: number) => {
  if (number === 1) return 'st'
  if (number === 2) return 'nd'
  if (number === 3) return 'rd'
  return 'th'
}


/* ========================================
   MARKER CLASS
======================================== */

const getMarkerClass = (
  index: number
) => {

  const classes = [
    'navy',
    'orange',
    'blue',
    'orange',
    'navy',
    'pink'
  ]


  return classes[index]

}

</script>


<style scoped>

.activity-page {

  --navy: #11184f;
  --orange: #f47a21;
  --blue: #42aeca;
  --light-blue: #9bc9e9;
  --pink: #df5572;
  --cream: #fffaf1;
  --text: #171717;
  --muted: #8d8d8d;

  position: relative;

  width: 100%;

  min-height: 100vh;

  overflow-x: hidden;
  overflow-y: visible;

  background-color:
    var(--cream);

  background-image:
    radial-gradient(
      circle,
      rgba(17, 24, 79, 0.08) 1px,
      transparent 1px
    );

  background-size:
    18px 18px;

  color:
    var(--text);

  box-sizing:
    border-box;

  padding:
    28px
    18px
    50px;

}


/* ========================================
   HEADER
======================================== */

.activity-header {

  position: relative;

  z-index: 20;

  text-align: center;

}


.section-label {

  display: inline-block;

  margin-bottom: 8px;

  color:
    var(--navy);

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 2px;

}


.activity-header h1 {

  margin: 0;

  color:
    var(--navy);

  font-size: 34px;

  line-height: 1;

  font-weight: 900;

}


.activity-header h1 span {

  display: block;

  color:
    var(--orange);

}


.activity-header p {

  margin:
    14px 0 0;

  color:
    var(--muted);

  font-size: 13px;

  line-height: 1.7;

}


/* ========================================
   ROADMAP SECTION
======================================== */

.roadmap-section {

  width: 100%;

  max-width: 380px;

  margin:
    24px auto 0;

}


/* ========================================
   ROADMAP VIEWPORT
======================================== */

.roadmap-viewport {

  position: relative;

  width: 100%;

  height: 300px;

  overflow: hidden;

  border: none;

  border-radius: 0;

  background: transparent;

  backdrop-filter: none;

  box-shadow: none;

}


/* ========================================
   ROADMAP WORLD
======================================== */

.roadmap-world {

  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 1050px;

  transition:
    transform
    0.55s
    cubic-bezier(
      0.22,
      0.61,
      0.36,
      1
    );

  will-change:
    transform;

}


/* ========================================
   ROAD
======================================== */

.road-svg {

  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 1050px;

  z-index: 1;

  pointer-events: none;

}


.road-shadow {

  fill: none;

  stroke:
    rgba(0, 0, 0, 0.13);

  stroke-width:
    43;

  stroke-linecap:
    round;

}


.road {

  fill: none;

  stroke:
    var(--navy);

  stroke-width:
    36;

  stroke-linecap:
    round;

}


.road-center {

  fill: none;

  stroke:
    rgba(255, 255, 255, 0.72);

  stroke-width:
    1.5;

  stroke-dasharray:
    8 10;

  stroke-linecap:
    round;

}


/* ========================================
   MILESTONE
======================================== */

.milestone {

  position: absolute;

  z-index: 8;

  display: flex;

  align-items: center;

  gap: 8px;

  width: auto;

  max-width: 245px;

  padding: 0;

  border: 0;

  background: transparent;

  font-family: inherit;

  text-align: left;

  cursor: pointer;

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

}


/* ========================================
   MARKER
======================================== */

.marker {

  position: relative;

  z-index: 10;

  width: 50px;

  height: 50px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius:
    50% 50% 50% 8px;

  transform:
    rotate(-45deg);

  box-shadow:
    0 6px 14px
    rgba(0, 0, 0, 0.14);

}


.marker > span {

  transform:
    rotate(45deg);

  color:
    white;

  font-size: 14px;

  font-weight: 900;

}


.marker-orange {

  background:
    var(--orange);

}


.marker-navy {

  background:
    var(--navy);

}


.marker-blue {

  background:
    var(--blue);

}


.marker-pink {

  background:
    var(--pink);

}


/* ========================================
   MILESTONE INFO
======================================== */

.milestone-info {

  display: block;

  min-width: 108px;

  max-width: 145px;

  padding:
    6px 8px;

  border-radius:
    7px;

  background:
    rgba(255, 250, 241, 0.93);

  backdrop-filter:
    blur(4px);

  box-sizing:
    border-box;

}


.milestone-label {

  display: block;

  color:
    #999;

  font-size: 7px;

  font-weight: 900;

  letter-spacing:
    0.8px;

}


.milestone-info strong {

  display: block;

  margin:
    2px 0;

  color:
    var(--navy);

  font-size: 14px;

  font-weight: 900;

  line-height: 1.15;

}


.milestone-info small {

  display: block;

  color:
    var(--orange);

  font-size: 8px;

  font-weight: 900;

}


.milestone-info em {

  display: block;

  margin-top: 2px;

  font-style: normal;

  font-size: 7px;

  font-weight: 900;

  letter-spacing:
    0.5px;

}


.now {

  color:
    var(--orange);

}


.completed {

  color:
    var(--navy);

}


.locked {

  color:
    #aaa;

}


/* ========================================
   STATUS
======================================== */

.milestone.status-locked {

  opacity:
    0.42;

  filter:
    grayscale(0.45);

}


.milestone.status-completed {

  opacity:
    0.68;

}


.milestone.status-active {

  opacity:
    1;

}


/* ========================================
   SELECTED
======================================== */

.milestone.selected {

  opacity:
    1;

}


.milestone.selected .milestone-info {

  box-shadow:
    0 3px 10px
    rgba(17, 24, 79, 0.08);

}


.milestone.selected .marker {

  animation:
    selectedMarker
    1.5s
    ease-in-out
    infinite;

}


@keyframes selectedMarker {

  0%,
  100% {

    transform:
      rotate(-45deg)
      scale(1);

  }

  50% {

    transform:
      rotate(-45deg)
      scale(1.07);

  }

}


/* ========================================
   POSITIONS
======================================== */

.milestone-1 {

  top:
    65px;

  left:
    6%;

}


.milestone-2 {

  top:
    239px;

  right:
    4%;

}


.milestone-3 {

  top:
    413px;

  left:
    5%;

}


.milestone-4 {

  top:
    587px;

  right:
    4%;

}


.milestone-5 {

  top:
    761px;

  left:
    5%;

}


.milestone-6 {

  top:
    935px;

  right:
    4%;

}


/* ========================================
   PREVIEW FADE
======================================== */

.preview-fade {

  position: absolute;

  left: 0;

  width: 100%;

  z-index: 12;

  pointer-events: none;

}


.preview-fade-top {

  top: 0;

  height: 55px;

  background:
    linear-gradient(
      to bottom,
      var(--cream),
      rgba(255, 250, 241, 0)
    );

}


.preview-fade-bottom {

  bottom: 0;

  height: 60px;

  background:
    linear-gradient(
      to top,
      var(--cream),
      rgba(255, 250, 241, 0)
    );

}


/* ========================================
   ROAD ARROWS
======================================== */

.road-arrow {

  position: absolute;

  z-index: 20;

  left: 50%;

  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  transform:
    translateX(-50%);

  border:
    2px solid
    var(--navy);

  border-radius:
    50%;

  background:
    var(--cream);

  color:
    var(--navy);

  font-size: 18px;

  font-weight: 700;

  line-height: 1;

  cursor: pointer;

  box-shadow:
    3px 4px 0
    var(--navy);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;

}


.road-arrow:hover:not(:disabled) {

  transform:
    translateX(-50%)
    translateY(2px);

  box-shadow:
    1px 2px 0
    var(--navy);

}


.road-arrow:disabled {

  opacity:
    0.25;

  cursor:
    default;

  box-shadow:
    none;

}


.road-arrow-up {

  top:
    10px;

}


.road-arrow-down {

  top:
    auto;

  bottom:
    10px;

}


/* ========================================
   VIEW FULL BUTTON
======================================== */

.view-full-button {

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    8px;

  margin:
    10px auto 0;

  padding:
    8px 15px;

  border:
    2px solid
    var(--navy);

  border-radius:
    11px;

  background:
    var(--orange);

  color:
    var(--navy);

  font-size:
    9px;

  font-weight:
    900;

  letter-spacing:
    0.5px;

  cursor:
    pointer;

  box-shadow:
    3px 3px 0
    var(--navy);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

}


.view-full-button:hover {

  transform:
    translate(1px, 1px);

  box-shadow:
    2px 2px 0
    var(--navy);

}


.view-full-button span {

  font-size:
    13px;

}


/* ========================================
   LOCKED MESSAGE
======================================== */

.locked-message {

  margin-top:
    9px;

  color:
    #aaa;

  font-size:
    8px;

}


/* ========================================
   AUTH
======================================== */

.auth-section {

  position:
    relative;

  z-index:
    20;

  margin-top:
    25px;

  padding:
    20px 10px 10px;

  text-align:
    center;

}


.auth-decoration {

  margin-bottom:
    3px;

  color:
    var(--orange);

  font-size:
    20px;

}


.auth-section h2 {

  margin:
    0;

  color:
    var(--navy);

  font-size:
    21px;

  font-weight:
    900;

}


.auth-section p {

  margin:
    7px 0 20px;

  color:
    var(--muted);

  font-size:
    12px;

}


/* ========================================
   AUTH BUTTONS
======================================== */

.auth-buttons {

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    12px;

}


.auth-button {

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  width:
    125px;

  min-height:
    46px;

  padding:
    10px 18px;

  box-sizing:
    border-box;

  border-radius:
    17px;

  font-size:
    13px;

  font-weight:
    800;

  text-decoration:
    none;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

}


/* ========================================
   LOGIN
   สีเดียวกับปุ่มในภาพ
======================================== */

.primary {

  background:
    #f47a21;

  color:
    var(--navy);

  border:
    3px solid
    var(--navy);

  box-shadow:
    5px 6px 0
    var(--navy);

}


.primary:hover {

  transform:
    translate(2px, 2px);

  box-shadow:
    3px 4px 0
    var(--navy);

}


.primary:active {

  transform:
    translate(5px, 6px);

  box-shadow:
    0 0 0
    var(--navy);

}


/* ========================================
   REGISTER
======================================== */

.secondary {

  background:
    var(--cream);

  color:
    var(--navy);

  border:
    3px solid
    var(--navy);

  box-shadow:
    5px 6px 0
    var(--navy);

}


.secondary:hover {

  transform:
    translate(2px, 2px);

  box-shadow:
    3px 4px 0
    var(--navy);

}


.secondary:active {

  transform:
    translate(5px, 6px);

  box-shadow:
    0 0 0
    var(--navy);

}


/* ========================================
   MODAL
======================================== */

.modal-backdrop {

  position:
    fixed;

  inset:
    0;

  z-index:
    1000;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  padding:
    20px;

  background:
    rgba(17, 24, 79, 0.55);

  backdrop-filter:
    blur(5px);

}


.milestone-modal {

  position:
    relative;

  width:
    100%;

  max-width:
    360px;

  padding:
    28px 22px 22px;

  border:
    3px solid
    var(--navy);

  border-radius:
    22px;

  background:
    var(--cream);

  box-shadow:
    7px 8px 0
    var(--navy);

  text-align:
    center;

  box-sizing:
    border-box;

}


.modal-close {

  position:
    absolute;

  top:
    10px;

  right:
    12px;

  width:
    32px;

  height:
    32px;

  border:
    2px solid
    var(--navy);

  border-radius:
    50%;

  background:
    var(--cream);

  color:
    var(--navy);

  font-size:
    20px;

  line-height:
    1;

  cursor:
    pointer;

}


.modal-marker {

  width:
    60px;

  height:
    60px;

  margin:
    0 auto 13px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  border-radius:
    50% 50% 50% 8px;

  color:
    white;

  font-size:
    17px;

  font-weight:
    900;

  transform:
    rotate(-45deg);

  box-shadow:
    0 6px 14px
    rgba(0, 0, 0, 0.15);

}


.modal-marker {

  position:
    relative;

}


.modal-marker::first-line {

  transform:
    rotate(45deg);

}


.modal-orange {

  background:
    var(--orange);

}


.modal-navy {

  background:
    var(--navy);

}


.modal-blue {

  background:
    var(--blue);

}


.modal-pink {

  background:
    var(--pink);

}


.modal-kicker {

  display:
    block;

  color:
    #999;

  font-size:
    8px;

  font-weight:
    900;

  letter-spacing:
    1.5px;

}


.milestone-modal h2 {

  margin:
    5px 0 3px;

  color:
    var(--navy);

  font-size:
    24px;

  font-weight:
    900;

}


.modal-date {

  margin:
    0;

  color:
    var(--orange);

  font-size:
    11px;

  font-weight:
    900;

}


.modal-status {

  display:
    inline-block;

  margin-top:
    10px;

  padding:
    5px 10px;

  border-radius:
    8px;

  font-size:
    8px;

  font-weight:
    900;

}


.modal-status-active {

  background:
    rgba(244, 122, 33, 0.12);

  color:
    var(--orange);

}


.modal-status-completed {

  background:
    rgba(17, 24, 79, 0.08);

  color:
    var(--navy);

}


.modal-divider {

  width:
    100%;

  height:
    1px;

  margin:
    18px 0;

  background:
    rgba(17, 24, 79, 0.1);

}


.modal-content {

  text-align:
    left;

}


.modal-content span {

  display:
    block;

  margin-bottom:
    6px;

  color:
    #999;

  font-size:
    8px;

  font-weight:
    900;

  letter-spacing:
    1px;

}


.modal-content p {

  margin:
    0;

  color:
    #555;

  font-size:
    12px;

  line-height:
    1.7;

}


.modal-action {

  width:
    100%;

  margin-top:
    20px;

  padding:
    11px;

  border:
    2px solid
    var(--navy);

  border-radius:
    12px;

  background:
    var(--orange);

  color:
    var(--navy);

  font-size:
    11px;

  font-weight:
    900;

  cursor:
    pointer;

  box-shadow:
    3px 4px 0
    var(--navy);

}




/* ========================================
   FULL ROADMAP VIEW
======================================== */

.full-roadmap-modal {
  position: relative;
  width: min(430px, 100%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(17, 24, 79, 0.10);
  border-radius: 22px;
  background: rgba(255, 250, 241, 0.96);
  backdrop-filter: blur(8px);
  box-shadow: 0 12px 28px rgba(17, 24, 79, 0.14);
  box-sizing: border-box;
}

.full-map-header {
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px 14px;
  border-bottom: 1px solid rgba(17, 24, 79, 0.10);
  background: var(--cream);
}

.full-map-header span {
  display: block;
  color: var(--orange);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 1.4px;
}

.full-map-header h2 {
  margin: 2px 0 0;
  color: var(--navy);
  font-size: 20px;
  font-weight: 900;
}

.full-map-header .modal-close {
  position: static;
  flex: 0 0 auto;
}

.full-map-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.full-roadmap-world {
  position: relative;
  width: 100%;
  height: 1050px;
  min-height: 1050px;
}

.full-road-svg {
  height: 1050px;
}

.full-map-milestone {
  position: absolute;
}

@media (max-width: 430px) {
  .modal-backdrop {
    padding: 12px;
  }

  .full-roadmap-modal {
    max-height: 92vh;
  }
}

/* ========================================
   MODAL TRANSITION
======================================== */

.modal-enter-active,
.modal-leave-active {

  transition:
    opacity 0.25s ease;

}


.modal-enter-active .milestone-modal,
.modal-leave-active .milestone-modal {

  transition:
    transform 0.25s ease;

}


.modal-enter-from,
.modal-leave-to {

  opacity:
    0;

}


.modal-enter-from .milestone-modal,
.modal-leave-to .milestone-modal {

  transform:
    translateY(20px)
    scale(0.97);

}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 360px) {

  .activity-page {

    padding-left:
      14px;

    padding-right:
      14px;

  }


  .activity-header h1 {

    font-size:
      30px;

  }


  .roadmap-viewport {

    height:
      285px;

  }


  .milestone-info {

    min-width:
      98px;

    max-width:
      130px;

  }


  .milestone-info strong {

    font-size:
      13px;

  }


  .marker {

    width:
      46px;

    height:
      46px;

  }


  .road-arrow {

    width:
      31px;

    height:
      31px;

  }


  .auth-button {

    width:
      115px;

  }

}


@media (max-width: 330px) {

  .roadmap-viewport {

    height:
      270px;

  }


  .milestone-info {

    min-width:
      88px;

    max-width:
      115px;

    padding:
      5px 7px;

  }


  .milestone-info strong {

    font-size:
      12px;

  }


  .milestone-info small {

    font-size:
      7px;

  }


  .marker {

    width:
      42px;

    height:
      42px;

  }


  .auth-buttons {

    gap:
      8px;

  }


  .auth-button {

    width:
      108px;

    min-height:
      44px;

    font-size:
      12px;

  }

}


</style>