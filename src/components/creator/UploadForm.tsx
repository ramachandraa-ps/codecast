
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/contexts/DataContext";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Video, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  videoUrl: z.string().url({ message: "Please enter a valid URL" }),
  thumbnailUrl: z.string().url({ message: "Please enter a valid thumbnail URL" }),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.array(z.string()).min(1, { message: "Please add at least one tag" }),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  "Web Development",
  "Backend Development",
  "Frontend Development",
  "Mobile Development",
  "Data Science",
  "DevOps",
  "Cloud",
  "Security",
  "Architecture",
  "Career",
];

const popularTags = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Node.js",
  "Python",
  "DevOps",
  "AWS",
  "Docker",
  "Database",
  "GraphQL",
  "System Design",
  "Testing",
  "CSS",
  "HTML",
];

const UploadForm: React.FC = () => {
  const { addVideo } = useData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      difficulty: "intermediate",
      category: "",
      tags: [],
    },
  });

  const { tags } = form.watch();

  const addTag = () => {
    const tag = currentTag.trim();
    if (!tag) return;
    
    if (!tags.includes(tag)) {
      form.setValue("tags", [...tags, tag]);
    }
    
    setCurrentTag("");
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const addPredefinedTag = (tag: string) => {
    if (!tags.includes(tag)) {
      form.setValue("tags", [...tags, tag]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Let's simulate a random duration between 5-30 minutes
      const duration = Math.floor(Math.random() * 1500) + 300;
      
      addVideo({
        ...data,
        duration,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Video title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what your video is about"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          placeholder="Add a tag"
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                        />
                        <Button type="button" onClick={addTag}>
                          Add
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag) => (
                          <Badge key={tag} className="flex gap-1 items-center">
                            {tag}
                            <X
                              size={14}
                              className="cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-2">Popular tags</div>
                        <div className="flex flex-wrap gap-2">
                          {popularTags
                            .filter((tag) => !tags.includes(tag))
                            .slice(0, 10)
                            .map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() => addPredefinedTag(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        placeholder="https://example.com/video.mp4"
                        {...field}
                        className="rounded-r-none"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-l-none border-l-0"
                      >
                        <Upload size={18} className="mr-2" />
                        Upload
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        placeholder="https://example.com/thumbnail.jpg"
                        {...field}
                        className="rounded-r-none"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-l-none border-l-0"
                      >
                        <Upload size={18} className="mr-2" />
                        Upload
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 p-4 border rounded-md bg-muted/30">
              <div className="flex gap-3 items-start">
                <Video size={20} className="text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Video Upload Tips</h4>
                  <ul className="mt-2 text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>Use clear, descriptive titles (60-70 characters)</li>
                    <li>Add relevant tags to improve discoverability</li>
                    <li>Choose an eye-catching thumbnail</li>
                    <li>Include timestamps in your description for longer videos</li>
                    <li>Set the correct difficulty level for your target audience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Publish Video"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadForm;
