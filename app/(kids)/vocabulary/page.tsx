import VocabularyLearning from '@/components/learning/VocabularyLearning'

export default function VocabularyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-2">
            🎯 英语单词学习
          </h1>
          <p className="text-lg text-gray-600">
            通过有趣的游戏和互动练习学习新单词
          </p>
        </div>

        {/* 学习进度概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">已学单词</h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">今日目标</h3>
                <p className="text-3xl font-bold text-green-600">10</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">连续学习</h3>
                <p className="text-3xl font-bold text-purple-600">0天</p>
              </div>
            </div>
          </div>
        </div>

        {/* 学习模式选择 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">选择学习模式</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-2">🔤</div>
              <h3 className="text-xl font-bold mb-2">闪卡学习</h3>
              <p className="text-sm opacity-90">通过闪卡记忆单词</p>
            </button>

            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 text-center hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-2">🎮</div>
              <h3 className="text-xl font-bold mb-2">拼写游戏</h3>
              <p className="text-sm opacity-90">听音拼写练习</p>
            </button>

            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-2">🧩</div>
              <h3 className="text-xl font-bold mb-2">选择题</h3>
              <p className="text-sm opacity-90">四选一练习</p>
            </button>

            <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl p-6 text-center hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-2">📝</div>
              <h3 className="text-xl font-bold mb-2">句子填空</h3>
              <p className="text-sm opacity-90">在句子中学习</p>
            </button>
          </div>
        </div>

        {/* 主学习区域 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-yellow-200">
          <VocabularyLearning />
        </div>

        {/* 学习提示 */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">学习小贴士</h3>
              <div className="mt-2 text-yellow-700">
                <p>• 每天学习10-15分钟效果最佳</p>
                <p>• 学习后及时复习能巩固记忆</p>
                <p>• 尝试用新单词造句，加深理解</p>
                <p>• 完成后记得领取奖励哦！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}