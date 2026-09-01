import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleHelp,
  Flame,
  LockKeyhole,
  Medal,
  Menu,
  Pencil,
  Play,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LearnQuest | Playful K-12 Learning" },
      { name: "description", content: "LearnQuest turns K-12 learning into a colorful quest with skill paths, streaks, XP, badges, and family progress." },
      { property: "og:title", content: "LearnQuest | Playful K-12 Learning" },
      { property: "og:description", content: "A colorful K-12 learning quest for curious kids, with clear progress for families and teachers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnQuest,
});

type Subject = "Math" | "Science" | "English";

const grades = [
  [1, "Sprout", "🌱"], [2, "Explorer", "🐣"], [3, "Builder", "🧱"],
  [4, "Inventor", "🚀"], [5, "Thinker", "🔭"], [6, "Scientist", "🧪"],
  [7, "Creator", "🎨"], [8, "Problem-solver", "🧩"], [9, "Navigator", "🧭"],
  [10, "Scholar", "📚"], [11, "Mentor", "🌟"], [12, "Champion", "🏆"],
] as const;

const subjectConfig: Record<Subject, { icon: string; kicker: string; nodes: string[]; progress: number; accent: string; iconTone: string; bar: string }> = {
  Math: { icon: "＋", kicker: "Numbers & patterns", nodes: ["Fractions", "Multiplication", "Area & perimeter", "Probability"], progress: 72, accent: "border-quest bg-quest/10 text-quest", iconTone: "bg-quest/10 text-quest", bar: "[&>div]:bg-quest" },
  Science: { icon: "✦", kicker: "Wonder & discovery", nodes: ["Living things", "Matter lab", "Energy", "Our planet"], progress: 54, accent: "border-sky bg-sky/15 text-sky-foreground", iconTone: "bg-sky/15 text-sky-foreground", bar: "[&>div]:bg-sky" },
  English: { icon: "Aa", kicker: "Words & stories", nodes: ["Story starters", "Grammar garden", "Reading trail", "Big ideas"], progress: 38, accent: "border-coral bg-coral/10 text-coral", iconTone: "bg-coral/10 text-coral", bar: "[&>div]:bg-coral" },
};

const learners = [
  { rank: 1, name: "Aisha K.", grade: "Grade 4", xp: "2,450 XP", change: "+2", initials: "AK", tone: "bg-sun text-sun-foreground" },
  { rank: 2, name: "Milo R.", grade: "Grade 3", xp: "2,180 XP", change: "+1", initials: "MR", tone: "bg-sky text-sky-foreground" },
  { rank: 3, name: "Zoe T.", grade: "Grade 5", xp: "1,995 XP", change: "—", initials: "ZT", tone: "bg-quest text-quest-foreground" },
  { rank: 4, name: "Dev P.", grade: "Grade 4", xp: "1,760 XP", change: "−1", initials: "DP", tone: "bg-coral text-coral-foreground" },
];

const badges = [
  { icon: "∑", name: "Math Master", note: "All numbers", tone: "bg-quest/10 text-quest" },
  { icon: "♨", name: "Reading Streak", note: "7 days strong", tone: "bg-coral/10 text-coral" },
  { icon: "✦", name: "Curious Mind", note: "10 discoveries", tone: "bg-sky/15 text-sky-foreground" },
  { icon: "★", name: "Speed Learner", note: "Keep exploring", tone: "bg-muted text-muted-foreground", locked: true },
  { icon: "◈", name: "Star Collector", note: "Keep exploring", tone: "bg-muted text-muted-foreground", locked: true },
  { icon: "♛", name: "Grade Champion", note: "Keep exploring", tone: "bg-muted text-muted-foreground", locked: true },
];

function LearnQuest() {
  const [selectedGrade, setSelectedGrade] = useState(4);
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Math");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const subject = subjectConfig[selectedSubject];

  const scrollToPath = () => document.getElementById("quest-path")?.scrollIntoView({ behavior: "smooth" });
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background font-body text-foreground">
      <nav className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="LearnQuest home">
            <span className="grid size-10 shrink-0 rotate-[-7deg] place-items-center rounded-[14px] bg-quest font-display text-xl font-extrabold text-quest-foreground shadow-[0_4px_0_color-mix(in_oklab,var(--quest)_68%,black)]">L</span>
            <span className="truncate font-display text-[23px] font-extrabold tracking-tight">LearnQuest</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-extrabold text-muted-foreground md:flex">
            <a className="border-b-2 border-quest pb-1 text-foreground transition-colors hover:text-quest" href="#quest-path">My path</a>
            <a className="transition-colors hover:text-quest" href="#rewards">Rewards</a>
            <a className="transition-colors hover:text-quest" href="#progress">Progress</a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-sun/20 px-3 py-2 text-sm font-extrabold text-sun-foreground sm:flex"><Flame className="size-4" /> 7</div>
            <Button variant="outline" size="sm" className="hidden rounded-full border-border bg-paper font-extrabold sm:inline-flex">Sign in</Button>
            <Button variant="outline" size="icon" className="rounded-full border-border bg-paper md:hidden" onClick={() => setMobileNavOpen((open) => !open)} aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileNavOpen}>
              {mobileNavOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {mobileNavOpen && <div className="quest-enter border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-extrabold">
            <a onClick={closeMobileNav} className="rounded-xl bg-quest/10 px-4 py-3 text-quest" href="#quest-path">My path</a>
            <a onClick={closeMobileNav} className="rounded-xl px-4 py-3 hover:bg-muted" href="#rewards">Rewards</a>
            <a onClick={closeMobileNav} className="rounded-xl px-4 py-3 hover:bg-muted" href="#progress">Progress</a>
            <Button variant="outline" size="sm" className="mt-2 w-fit rounded-full border-border bg-paper font-extrabold">Sign in</Button>
          </div>
        </div>}
      </nav>

      <section id="top" className="quest-hero relative isolate overflow-hidden text-quest-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
          <div className="relative z-10">
            <Badge className="border-0 bg-background/12 px-3 py-1.5 font-extrabold text-background"><Sparkles className="mr-1.5 size-3.5" /> A little progress, every day</Badge>
            <h1 className="mt-6 max-w-[12ch] font-display text-5xl font-extrabold leading-[.94] tracking-tight sm:text-7xl">A bigger world<br />starts with <span className="text-sun">one quest.</span></h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-background/80 sm:text-xl">Pick up where curiosity left off. Build skills, earn XP, and see every small win add up.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={scrollToPath} size="lg" className="h-14 rounded-2xl bg-background px-7 font-display text-lg font-extrabold text-quest shadow-[0_5px_0_color-mix(in_oklab,var(--foreground)_35%,transparent)] transition-transform hover:-translate-y-0.5 hover:bg-background active:translate-y-1">Continue today’s quest <ArrowRight className="size-5" /></Button>
              <Button variant="ghost" onClick={scrollToPath} size="lg" className="h-14 rounded-2xl px-4 font-extrabold text-background hover:bg-background/10 hover:text-background"><Play className="size-4 fill-current" /> See your path</Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-extrabold text-background/80"><div className="flex -space-x-2"><span className="grid size-9 place-items-center rounded-full border-2 border-quest bg-sun text-xs text-sun-foreground">AK</span><span className="grid size-9 place-items-center rounded-full border-2 border-quest bg-sky text-xs text-sky-foreground">MR</span><span className="grid size-9 place-items-center rounded-full border-2 border-quest bg-background text-xs text-quest">ZT</span></div><span>2,400 curious minds learning today</span></div>
          </div>
          <div className="quest-enter relative mx-auto min-h-[360px] w-full max-w-[510px] lg:min-h-[430px]">
            <div className="absolute inset-x-8 bottom-4 top-10 rounded-[42%] bg-sun/20 blur-3xl" />
            <div className="absolute right-[4%] top-6 grid size-28 rotate-6 place-items-center rounded-[35%] border border-background/20 bg-background/10 font-display text-5xl font-extrabold text-sun shadow-2xl">?</div>
            <div className="absolute bottom-3 left-[2%] grid size-20 -rotate-12 place-items-center rounded-[30%] border border-background/20 bg-background/10 font-display text-3xl font-extrabold text-background">＋</div>
            <div className="absolute inset-x-5 top-16 rounded-[30px] border border-background/65 bg-paper p-5 text-foreground shadow-[0_22px_0_color-mix(in_oklab,var(--foreground)_18%,transparent)] sm:inset-x-10 sm:top-14 sm:p-7">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-[.18em] text-quest">Today’s quest</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Area & perimeter</h2><p className="mt-1 text-sm font-bold text-muted-foreground">Math · Grade {selectedGrade}</p></div><span className="grid size-12 place-items-center rounded-2xl bg-quest/10 font-display text-2xl font-extrabold text-quest">3</span></div>
              <div className="mt-7 rounded-2xl bg-quest/7 p-4"><div className="flex items-center justify-between gap-3 text-sm font-extrabold"><span>34% complete</span><span className="text-quest">+120 XP</span></div><Progress value={34} className="mt-3 h-3 bg-quest/15 [&>div]:bg-quest" /></div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4"><div className="flex items-center gap-2 text-sm font-extrabold text-muted-foreground"><span className="grid size-8 place-items-center rounded-full bg-coral/10 text-coral"><Flame className="size-4" /></span> 7-day streak</div><span className="text-xs font-black uppercase tracking-widest text-muted-foreground">12 min</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="font-black uppercase tracking-[.18em] text-quest text-xs">Choose a trail</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Where are you today?</h2></div><span className="hidden font-extrabold text-muted-foreground sm:block">12 grades <ChevronRight className="inline size-4" /></span></div>
        <div className="-mx-5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0"><div className="flex w-max gap-3 sm:grid sm:w-auto sm:grid-cols-4 lg:grid-cols-6">
          {grades.map(([grade, name, icon]) => <Button key={grade} variant="outline" onClick={() => { setSelectedGrade(grade); scrollToPath(); }} aria-pressed={selectedGrade === grade} className={`group h-auto w-[124px] shrink-0 flex-col items-start gap-1 rounded-2xl border-border bg-background p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-quest/60 hover:bg-quest/5 sm:w-auto ${selectedGrade === grade ? "border-quest bg-quest text-quest-foreground shadow-[0_5px_0_color-mix(in_oklab,var(--quest)_68%,black)] hover:bg-quest" : ""}`}><span className="text-2xl" aria-hidden="true">{icon}</span><span className="font-display text-xl font-extrabold">{grade}</span><span className={`text-xs font-extrabold ${selectedGrade === grade ? "text-quest-foreground/80" : "text-muted-foreground"}`}>{name}</span></Button>)}
        </div></div>
        <p className="mt-2 text-sm font-bold text-muted-foreground sm:hidden">Grade {selectedGrade} selected · swipe to explore all grades</p>
      </section>

      <section id="quest-path" className="border-y border-border/70 bg-mint/35">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[1.45fr_.8fr] lg:py-20">
          <div className="rounded-[28px] border border-border bg-background p-6 shadow-[0_16px_40px_color-mix(in_oklab,var(--quest)_8%,transparent)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="font-black uppercase tracking-[.18em] text-quest text-xs">Grade {selectedGrade} · Skill path</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Your next little win</h2><p className="mt-1 font-semibold text-muted-foreground">One clear step now. More of the trail opens as you go.</p></div><div className="flex items-center gap-2 rounded-full bg-coral/10 px-3 py-2 text-sm font-extrabold text-coral"><Flame className="size-4" /> 7-day streak</div></div>
            <div className="mt-8 flex flex-wrap gap-2">{(Object.keys(subjectConfig) as Subject[]).map((name) => <Button key={name} variant="outline" onClick={() => setSelectedSubject(name)} aria-pressed={selectedSubject === name} className={`rounded-full border-border px-4 font-extrabold transition-transform ${selectedSubject === name ? subjectConfig[name].accent : "bg-background text-muted-foreground hover:border-quest/40"}`}>{subjectConfig[name].icon} {name}</Button>)}</div>
            <div key={selectedSubject} className="quest-reveal relative mt-10 space-y-7 pl-3 before:absolute before:bottom-4 before:left-[31px] before:top-4 before:w-1 before:rounded-full before:bg-quest/12 sm:pl-4">
              {subject.nodes.map((node, index) => <div key={node} className="relative flex items-center gap-4"><div className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-4 border-background font-display text-xl font-extrabold shadow-sm ${index < 2 ? "bg-quest text-quest-foreground" : index === 2 ? "bg-sun text-sun-foreground ring-4 ring-sun/25" : "bg-muted text-muted-foreground"}`}>{index < 2 ? <Check className="size-6" /> : index === 2 ? "3" : <LockKeyhole className="size-5" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className={`font-display text-lg font-extrabold ${index === 3 ? "text-muted-foreground" : ""}`}>{node}</h3><span className={`text-xs font-black uppercase tracking-wider ${index < 2 ? "text-quest" : index === 2 ? "text-sun-foreground" : "text-muted-foreground"}`}>{index < 2 ? "complete" : index === 2 ? "up next" : "locked"}</span></div><Progress value={index < 2 ? 100 : index === 2 ? 34 : 0} className={`mt-2 h-2.5 ${index === 2 ? "bg-sun/20 [&>div]:bg-sun" : "bg-muted [&>div]:bg-quest"}`} /></div></div>)}
            </div>
            <Button onClick={scrollToPath} className="mt-9 h-13 w-full rounded-2xl bg-quest font-extrabold text-quest-foreground shadow-[0_4px_0_color-mix(in_oklab,var(--quest)_68%,black)] hover:bg-quest">Continue {subject.nodes[2]} <ArrowRight className="size-4" /></Button>
          </div>
          <aside className="flex flex-col gap-4" aria-label="Quest status">
            <div className="rounded-[28px] bg-foreground p-6 text-background shadow-sm sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="font-black uppercase tracking-[.18em] text-background/55 text-xs">Your quest status</p><h2 className="mt-2 font-display text-3xl font-extrabold">Level 12 · Explorer</h2></div><Trophy className="size-9 shrink-0 text-sun" /></div><div className="mt-8 flex items-baseline justify-between gap-4"><p className="font-display text-xl font-extrabold">340 <span className="text-sm text-background/55">/ 500 XP</span></p><p className="text-sm font-extrabold text-sun">160 earned this week</p></div><Progress value={68} className="mt-3 h-3 bg-background/15 [&>div]:bg-sun" /><p className="mt-4 text-sm font-bold text-background/65">You’re 160 XP away from Level 13.</p></div>
            <div className="grid grid-cols-2 gap-4"><div className="rounded-2xl border border-border bg-background p-5"><Flame className="size-7 text-coral" /><p className="mt-3 font-display text-3xl font-extrabold">7</p><p className="text-sm font-extrabold text-muted-foreground">day streak</p></div><div className="rounded-2xl border border-border bg-background p-5"><Medal className="size-7 text-sky" /><p className="mt-3 font-display text-3xl font-extrabold">12</p><p className="text-sm font-extrabold text-muted-foreground">badges earned</p></div></div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><div className="mb-7 flex items-end justify-between gap-4"><div><p className="font-black uppercase tracking-[.18em] text-coral text-xs">Your pace</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Progress by subject</h2></div><Button variant="ghost" className="hidden font-extrabold text-muted-foreground sm:flex">View all stats <ChevronRight className="size-4" /></Button></div><div className="grid gap-4 md:grid-cols-3">{(Object.entries(subjectConfig) as [Subject, typeof subjectConfig[Subject]][]).map(([name, config]) => <div key={name} className="rounded-2xl border border-border bg-background p-5 shadow-sm transition-transform hover:-translate-y-0.5"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className={`grid size-10 place-items-center rounded-xl font-display font-extrabold ${config.iconTone}`}>{config.icon}</span><div><h3 className="font-display text-lg font-extrabold">{name}</h3><p className="text-xs font-bold text-muted-foreground">{config.kicker}</p></div></div><span className="font-display text-lg font-extrabold">{config.progress}%</span></div><Progress value={config.progress} className={`mt-5 h-3 bg-muted ${config.bar}`} /><p className="mt-3 text-sm font-bold text-muted-foreground">{Math.round(config.progress / 10)} lessons completed this month</p></div>)}</div></section>

      <section id="rewards" className="border-y border-border/70 bg-paper"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:py-20"><div><p className="font-black uppercase tracking-[.18em] text-sun-foreground text-xs">Collect the good stuff</p><h2 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight">Every win<br />deserves a badge.</h2><p className="mt-4 max-w-sm font-semibold leading-relaxed text-muted-foreground">Small moments add up. Celebrate the skills you’ve practised and keep the next reward in sight.</p><Button onClick={scrollToPath} className="mt-7 rounded-xl bg-sun font-extrabold text-sun-foreground shadow-[0_4px_0_color-mix(in_oklab,var(--sun)_62%,black)] hover:bg-sun">Earn your next badge <ArrowRight className="size-4" /></Button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{badges.map((badge) => <div key={badge.name} className={`rounded-2xl border border-border bg-background p-4 text-center shadow-sm transition-transform hover:-translate-y-0.5 ${badge.locked ? "opacity-60" : ""}`}><div className={`mx-auto grid size-14 place-items-center rounded-2xl font-display text-3xl font-extrabold ${badge.tone}`}>{badge.locked ? <LockKeyhole className="size-5" /> : badge.icon}</div><h3 className="mt-3 font-display text-base font-extrabold">{badge.name}</h3><p className="mt-0.5 text-xs font-bold text-muted-foreground">{badge.note}</p></div>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20"><div className="rounded-[28px] border border-border bg-background p-6 shadow-sm sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="font-black uppercase tracking-[.18em] text-coral text-xs">Grade 4 · This week</p><h2 className="mt-2 font-display text-3xl font-extrabold">Quest leaderboard</h2></div><Trophy className="size-8 shrink-0 text-sun" /></div><div className="mt-6 space-y-2">{learners.map((learner) => <div key={learner.rank} className={`flex items-center gap-3 rounded-xl p-3 ${learner.rank === 1 ? "bg-sun/15" : "bg-muted/45"}`}><span className={`w-5 text-center font-display text-xl font-extrabold ${learner.rank === 1 ? "text-sun-foreground" : "text-muted-foreground"}`}>{learner.rank}</span><span className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-black ${learner.tone}`}>{learner.initials}</span><div className="min-w-0 flex-1"><p className="truncate font-display font-extrabold">{learner.name}</p><p className="text-xs font-bold text-muted-foreground">{learner.grade}</p></div><div className="text-right"><p className="text-sm font-extrabold">{learner.xp}</p><p className={`text-[11px] font-black ${learner.change.startsWith("+") ? "text-quest" : "text-muted-foreground"}`}>{learner.change} this week</p></div></div>)}</div><Button variant="outline" className="mt-5 w-full rounded-xl border-border font-extrabold">See full leaderboard <ArrowRight className="size-4" /></Button></div><div className="rounded-[28px] border border-border bg-background p-6 shadow-sm sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="font-black uppercase tracking-[.18em] text-quest text-xs">My collection</p><h2 className="mt-2 font-display text-3xl font-extrabold">Badge shelf</h2></div><span className="rounded-full bg-quest/10 px-3 py-1.5 text-sm font-extrabold text-quest">3 / 6</span></div><div className="mt-6 grid grid-cols-3 gap-3">{badges.map((badge) => <div key={`${badge.name}-shelf`} className={`grid aspect-square place-items-center rounded-2xl border border-border ${badge.tone} ${badge.locked ? "opacity-45" : ""}`} title={badge.name}>{badge.locked ? <LockKeyhole className="size-5" /> : <span className="font-display text-3xl font-extrabold">{badge.icon}</span>}</div>)}</div><div className="mt-5 flex items-center justify-between gap-2 text-center text-xs font-bold text-muted-foreground sm:text-sm"><span>Math Master</span><span>Reading Streak</span><span>3 more to unlock</span></div></div></section>

      <section id="progress" className="bg-foreground text-background"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><div className="flex flex-wrap items-start justify-between gap-6"><div><Badge className="border-0 bg-background/10 px-3 py-1.5 font-extrabold text-background"><BarChart3 className="mr-1.5 size-3.5" /> Parent & teacher view</Badge><h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-tight">A calm window into the quest.</h2><p className="mt-4 max-w-lg text-lg font-semibold leading-relaxed text-background/70">Aisha K. · Grade 4 · This week. Clear momentum, without getting in the way of the fun.</p></div><Button variant="outline" className="rounded-xl border-background/25 bg-background/10 font-extrabold text-background hover:bg-background/20 hover:text-background">Open progress report <ArrowRight className="size-4" /></Button></div><div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_.75fr]"><div className="rounded-2xl bg-background/10 p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-widest text-background/55">Weekly activity</p><p className="mt-1 font-display text-2xl font-extrabold">A steady climb</p></div><span className="flex items-center gap-1.5 text-sm font-extrabold text-sun"><Sparkles className="size-4" /> +18% this week</span></div><div className="mt-8 flex h-36 items-end gap-2 border-b border-background/10 pb-0">{[48, 66, 42, 80, 92, 58, 30].map((height, index) => <div key={index} className={`group relative flex-1 rounded-t-lg ${index === 4 ? "bg-sun" : "bg-sky/65"}`} style={{ height: `${height}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-xs font-black text-background/70 group-hover:block">{Math.round(height / 4)}m</span></div>)}</div><div className="mt-3 flex justify-between text-[10px] font-black tracking-widest text-background/45"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div><div className="rounded-2xl bg-background p-5 text-foreground sm:p-7"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Users className="size-5 text-sky" /><p className="font-display text-xl font-extrabold">At a glance</p></div><span className="rounded-full bg-quest/10 px-2.5 py-1 text-xs font-extrabold text-quest">Aisha · Grade 4</span></div><div className="mt-6 grid gap-4 min-[420px]:grid-cols-3"><div><p className="font-display text-2xl font-extrabold">24h</p><p className="text-xs font-bold text-muted-foreground">time learning</p></div><div><p className="font-display text-2xl font-extrabold">128</p><p className="text-xs font-bold text-muted-foreground">quizzes passed</p></div><div><p className="font-display text-2xl font-extrabold">92%</p><p className="text-xs font-bold text-muted-foreground">accuracy</p></div></div><div className="mt-7 border-t border-border pt-5"><p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Teacher note · Today</p><p className="mt-2 font-semibold leading-relaxed">“Strong week in English. A little more practice with long division will unlock the next trail.”</p><div className="mt-4 flex items-center gap-2 text-sm font-extrabold text-muted-foreground"><span className="grid size-8 place-items-center rounded-full bg-coral/10 text-coral"><Pencil className="size-4" /></span> Ms. Rivera</div></div></div></div></div></section>

      <footer className="border-t border-border bg-paper"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-9 text-center sm:flex-row sm:px-8 sm:text-left"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-quest font-display font-extrabold text-quest-foreground">L</span><span className="font-display text-lg font-extrabold">LearnQuest</span></div><p className="text-sm font-bold text-muted-foreground">Made for curious minds, built for the whole trail.</p><div className="flex items-center gap-4 text-sm font-extrabold text-muted-foreground"><a href="#progress" className="hover:text-quest">Parents</a><a href="#quest-path" className="hover:text-quest">Learning path</a><a href="#top" className="hover:text-quest"><CircleHelp className="size-4" /></a></div></div></footer>
    </main>
  );
}
