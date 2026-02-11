import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wrench, Wind, TreePine, DoorOpen, Flame, AlertTriangle, Ban, ShieldCheck } from "lucide-react";

interface FireplaceInstructionsPhaseProps {
  lang: "fi" | "en";
  onComplete: () => void;
}

const instructions = {
  fi: [
    {
      icon: Wrench,
      title: "Avaa savupelti",
      text: "Takan yläosassa on varsi – vedä se ulos auki-asentoon. Jos tätä ei tehdä, savu tulee sisään huoneistoon!",
      warning: false,
    },
    {
      icon: Wind,
      title: "Avaa tuhkalaatikko hieman",
      text: "Takan alaosassa on tuhkalaatikko – avaa se hieman raolleen, jotta ilma pääsee kiertämään tulipesässä.",
      warning: false,
    },
    {
      icon: TreePine,
      title: "Aseta puut ja sytykkeet",
      text: "Laita polttopuut tulipesään ja käytä sytykkeenä sanomalehteä tai tuohta.",
      warning: false,
    },
    {
      icon: DoorOpen,
      title: "Ilmanvaihto sytyttäessä",
      text: "Pidä parvekkeen ovea raollaan sytyttäessä. Voit sulkea oven, kun tuli palaa hyvin. Tarkista myös, että keittiön liesituuletin on enintään teholla 1 – korkeampi teho imee palamiseen tarvittavan ilman pois.",
      warning: false,
    },
    {
      icon: Flame,
      title: "Sytytä takka",
      text: "Sytytä tuli ja pidä lasiluukkua hetken raollaan, kunnes veto paranee. Sen jälkeen sulje luukku.",
      warning: false,
    },
    {
      icon: AlertTriangle,
      title: "Älä polta liikaa",
      text: "Lisää puita enintään kahdesti (2 pesällistä). Älä ylikuormita takkaa – liiallinen polttaminen kuumentaa takan ja huoneiston liikaa, ja takka voi vaurioitua.",
      warning: true,
    },
    {
      icon: Ban,
      title: "Älä poista kuumaa tuhkaa",
      text: "Älä koskaan poista kuumaa tai hehkuvaa tuhkaa tai puita takasta. Kuuma tuhka aiheuttaa palovaaran. Anna tuhkan jäähtyä täysin ennen käsittelyä.",
      warning: true,
    },
    {
      icon: ShieldCheck,
      title: "Kun takka on sammunut",
      text: "Varmista, että tuli on täysin sammunut eikä hiilloksia ole näkyvissä. Vasta sen jälkeen työnnä varsi takaisin sisään ja sulje savupelti. Savupelti on hyvä sulkea sammumisen jälkeen, koska avoin pelti päästää lämmön huoneistosta ulos ja kylmentää asuntoa. Peldin sulkeminen liian aikaisin on kuitenkin hengenvaarallista – häkä voi täyttää huoneiston!",
      warning: true,
    },
  ],
  en: [
    {
      icon: Wrench,
      title: "Open the flue",
      text: "At the top of the fireplace, pull the handle out to open position. If not done, smoke will come into the apartment!",
      warning: false,
    },
    {
      icon: Wind,
      title: "Open the ash drawer slightly",
      text: "At the bottom of the fireplace, open the ash drawer just a little to ensure good airflow.",
      warning: false,
    },
    {
      icon: TreePine,
      title: "Add wood and kindling",
      text: "Place logs inside and use newspaper or birch bark to start the fire.",
      warning: false,
    },
    {
      icon: DoorOpen,
      title: "Ventilation when lighting",
      text: "Keep the balcony door slightly open while lighting. You can close it once the fire has caught. Also check that the kitchen extractor fan is set to level 1 – a higher setting will remove the air needed for proper combustion.",
      warning: false,
    },
    {
      icon: Flame,
      title: "Light the fire",
      text: "Light the fire and leave the glass door slightly open until the draft improves. Then close it.",
      warning: false,
    },
    {
      icon: AlertTriangle,
      title: "Do not overload",
      text: "Add wood only twice (2 loads). Do not overload the fireplace – burning too much will overheat the apartment and may damage the fireplace.",
      warning: true,
    },
    {
      icon: Ban,
      title: "Never remove hot ash",
      text: "Never remove hot or glowing ash or logs from the fireplace. Hot ash is a fire hazard. Allow ash to cool completely before handling.",
      warning: true,
    },
    {
      icon: ShieldCheck,
      title: "After the fire is out",
      text: "Make sure the fire is completely extinguished and no embers are visible. Only then push the handle back in to close the flue. It is important to close the flue after the fire is out, as an open flue lets heat escape and cools down the apartment. However, closing the flue too early is life-threatening – carbon monoxide can fill the apartment!",
      warning: true,
    },
  ],
};

const labels = {
  fi: {
    stepTitle: "Vaihe 2: Lue takan käyttöohjeet",
    intro: "Käy alla olevat ohjeet läpi vaihe vaiheelta. Kuittaa jokainen kohta luetuksi ennen kuin voit jatkaa.",
    checkbox: "Olen lukenut ja ymmärtänyt tämän kohdan",
    progress: "kohtaa luettu",
    continueBtn: "Näytä takan avauskoodi →",
  },
  en: {
    stepTitle: "Step 2: Read the fireplace instructions",
    intro: "Go through the instructions step by step. Confirm each point before you can continue.",
    checkbox: "I have read and understood this point",
    progress: "points confirmed",
    continueBtn: "Show fireplace unlock code →",
  },
};

const FireplaceInstructionsPhase = ({ lang, onComplete }: FireplaceInstructionsPhaseProps) => {
  const [checked, setChecked] = useState<boolean[]>(new Array(8).fill(false));
  const items = instructions[lang];
  const strings = labels[lang];
  const checkedCount = checked.filter(Boolean).length;
  const allChecked = checkedCount === items.length;

  const toggleCheck = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground text-center">{strings.stepTitle}</h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto">{strings.intro}</p>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {checkedCount}/{items.length} {strings.progress}
          </span>
          <span>{Math.round((checkedCount / items.length) * 100)}%</span>
        </div>
        <Progress value={(checkedCount / items.length) * 100} className="h-2" />
      </div>

      {/* Instruction cards */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isWarning = item.warning;
          return (
            <div
              key={index}
              className={`glass-card rounded-xl p-5 border transition-all duration-200 ${
                checked[index]
                  ? "border-green-500/40 bg-green-500/5"
                  : isWarning
                    ? "border-orange-500/40"
                    : "border-border/30"
              }`}
            >
              <div className="flex gap-4">
                {/* Number + Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isWarning ? "bg-orange-500/20" : "bg-primary/20"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isWarning ? "text-orange-500" : "text-primary"}`} />
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-xs font-bold text-muted-foreground">
                      {index + 1}/{items.length}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>

                  {/* Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox checked={checked[index]} onCheckedChange={() => toggleCheck(index)} className="h-5 w-5" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {strings.checkbox}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="text-center pt-4">
        <Button
          size="lg"
          onClick={onComplete}
          disabled={!allChecked}
          className={allChecked ? "bg-green-600 hover:bg-green-700 text-white" : "opacity-50 cursor-not-allowed"}
        >
          {strings.continueBtn}
        </Button>
      </div>
    </div>
  );
};

export default FireplaceInstructionsPhase;
