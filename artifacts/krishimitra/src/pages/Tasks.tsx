import { ListChecks, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";

export default function Tasks() {
  const { lang, tasks, toggleTask } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ListChecks className="h-7 w-7 text-green-700" />
        <h1 className="text-2xl md:text-3xl font-bold">{t("tasks", lang)}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("taskList", lang)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between gap-3 rounded-xl border p-4 hover-elevate ${
                  task.done ? "bg-green-50 dark:bg-green-950/10" : ""
                }`}
                data-testid={`task-${task.id}`}
              >
                <div className="flex items-center gap-3">
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <div
                      className={`font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}
                    >
                      {t(task.titleKey, lang)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(task.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      task.done
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-amber-100 text-amber-800 border-amber-300"
                    }
                  >
                    {task.done ? t("done", lang) : t("pending", lang)}
                  </Badge>
                  <Button
                    size="sm"
                    variant={task.done ? "outline" : "default"}
                    className={!task.done ? "bg-green-700 hover:bg-green-800 text-white" : ""}
                    onClick={() => toggleTask(task.id)}
                    data-testid={`button-toggle-${task.id}`}
                  >
                    {task.done ? t("pending", lang) : t("markComplete", lang)}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
