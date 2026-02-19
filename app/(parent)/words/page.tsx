import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import axios from 'axios';

const wordSchema = z.object({
  word: z.string().min(1, '单词不能为空'),
  translation: z.string().min(1, '翻译不能为空'),
  pronunciation: z.string().optional(),
  example: z.string().optional(),
  category: z.string().min(1, '分类不能为空'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
});

type WordFormData = z.infer<typeof wordSchema>;

export default function WordsManagement() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<WordFormData>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      word: '',
      translation: '',
      category: '',
      difficulty: 'EASY' as const,
    },
  });

  const onSubmit = async (data: WordFormData) => {
    setLoading(true);
    try {
      await axios.post('/api/words', data);
      form.reset();
      // Refresh words list
      loadWords();
      toast.success('单词添加成功');
    } catch (error) {
      toast.error('添加失败');
    } finally {
      setLoading(false);
    }
  };

  const loadWords = async () => {
    try {
      const res = await axios.get('/api/words');
      setWords(res.data.words);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>单词管理</CardTitle>
            <CardDescription>添加和管理学习单词</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="word">单词</Label>
                  <Input id="word" {...form.register('word')} />
                  {form.formState.errors.word && <p className="text-sm text-red-500">{form.formState.errors.word.message}</p>}
                </div>
                <div>
                  <Label htmlFor="translation">翻译</Label>
                  <Input id="translation" {...form.register('translation')} />
                  {form.formState.errors.translation && <p className="text-sm text-red-500">{form.formState.errors.translation.message}</p>}
                </div>
                <div>
                  <Label htmlFor="category">分类</Label>
                  <Input id="category" {...form.register('category')} />
                </div>
                <div>
                  <Label htmlFor="difficulty">难度</Label>
                  <Input id="difficulty" {...form.register('difficulty')} />
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                <Plus className="w-4 h-4 mr-2" />
                添加单词
              </Button>
            </form>
          </CardContent>
        </Card>
        {/* Words list */}
      </div>
    </div>
  );
}
